/**
 * اعرف طريقك — حفظ وقراءة التسجيلات من Google Sheets
 *
 * =========================
 * اعمل الخطوات دي بالظبط:
 * =========================
 * 1) افتح ملف الشيت
 * 2) انسخ الـ ID من الرابط:
 *    https://docs.google.com/spreadsheets/d/XXXX/edit
 *    XXXX = SPREADSHEET_ID
 * 3) حطه تحت في SPREADSHEET_ID
 * 4) غيّر ADMIN_LIST_KEY لمفتاح سري (نفسه اللي هتدخله في صفحة الأدمن)
 * 5) احفظ الملف
 * 6) من فوق: Run → اختار testConnection → Run
 *    لو نجح هتلاقي سطر تجريبي في تاب "التسجيلات"
 * 7) Deploy → Manage deployments → قلم Edit
 *    → Version: New version → Deploy
 *
 * قراءة التسجيلات (للداشبورد):
 *   GET ?action=list&key=ADMIN_LIST_KEY
 */

// ←←← حط ID الشيت هنا (مهم جدًا)
var SPREADSHEET_ID = '1V7qyTDFW3vYptTZ6NPetPtM531RhdKXkpqLi0ZEf0T0';

// ←←← مفتاح سري لصفحة الأدمن (غيّره قبل الـ Deploy)
var ADMIN_LIST_KEY = 'nadwa-admin-2026';

var SHEET_NAME = 'التسجيلات';
var HEADERS = ['الوقت', 'الاسم', 'الفئة', 'متوقع من المبادرة'];

function doPost(e) {
  try {
    var data = readPayload_(e);
    var name = String(data.name || '').trim();
    var role = String(data.role || '').trim();
    var expectation = String(data.expectation || '').trim();

    if (!name || !role || !expectation) {
      return json_({ ok: false, error: 'missing_required_fields', received: data });
    }

    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);
    sheet.appendRow([new Date(), name, role, expectation]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var action = e && e.parameter && e.parameter.action ? String(e.parameter.action) : '';

    if (action === 'list') {
      return listRegistrations_(e);
    }

    getOrCreateSheet_();
    return ContentService
      .createTextOutput('جاهز ✅ — الشيت متصل. جرّب التسجيل من الموقع.')
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput('خطأ ❌: ' + String(err))
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function listRegistrations_(e) {
  var key = e && e.parameter && e.parameter.key ? String(e.parameter.key) : '';
  if (!ADMIN_LIST_KEY || key !== ADMIN_LIST_KEY) {
    return json_({ ok: false, error: 'unauthorized' });
  }

  var sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);

  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return json_({ ok: true, count: 0, registrations: [] });
  }

  var values = sheet.getRange(2, 1, lastRow, HEADERS.length).getValues();
  var registrations = [];

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var name = String(row[1] || '').trim();
    var role = String(row[2] || '').trim();
    var expectation = String(row[3] || '').trim();

    // تجاهل الصفوف الفاضية
    if (!name && !role && !expectation) continue;

    var ts = row[0];
    var timestamp = '';
    if (ts instanceof Date) {
      timestamp = ts.toISOString();
    } else if (ts) {
      timestamp = String(ts);
    }

    registrations.push({
      id: i + 1,
      timestamp: timestamp,
      name: name,
      role: role,
      expectation: expectation,
    });
  }

  return json_({ ok: true, count: registrations.length, registrations: registrations });
}

/** شغّل الدالة دي يدويًا من Apps Script للتأكد */
function testConnection() {
  var sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);
  sheet.appendRow([new Date(), 'اختبار', 'طالب', 'سطر تجريبي من Apps Script']);
  Logger.log('تم الكتابة بنجاح في تاب: ' + SHEET_NAME);
}

function readPayload_(e) {
  var data = {};

  if (e && e.parameter) {
    data.name = e.parameter.name;
    data.role = e.parameter.role;
    data.expectation = e.parameter.expectation;
  }

  // لو البيانات جت JSON
  if (e && e.postData && e.postData.contents) {
    try {
      var parsed = JSON.parse(e.postData.contents);
      data.name = data.name || parsed.name;
      data.role = data.role || parsed.role;
      data.expectation = data.expectation || parsed.expectation;
    } catch (ignore) {}
  }

  return data;
}

function getOrCreateSheet_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('حط_') === 0) {
    // لو السكريبت مربوط بالشيت مباشرة
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active.getSheetByName(SHEET_NAME) || active.insertSheet(SHEET_NAME);
    throw new Error('حط SPREADSHEET_ID من رابط الشيت، أو افتح Apps Script من داخل ملف الشيت نفسه');
  }

  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
