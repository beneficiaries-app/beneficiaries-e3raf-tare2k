/**
 * اعرف طريقك — حفظ التسجيلات في Google Sheets
 *
 * خطوات التشغيل:
 * 1) افتح Google Sheets → أنشئ شيت جديد باسم: تسجيلات اعرف طريقك
 * 2) Extensions → Apps Script
 * 3) الصق الكود ده كله واحفظه
 * 4) Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5) انسخ رابط الـ Web app وحطه في ملف .env:
 *    VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
 * 6) أعد تشغيل npm run dev
 *
 * أعمدة الشيت (تُنشأ تلقائيًا):
 * الوقت | الاسم | الفئة | متوقع من المبادرة
 */

var SHEET_NAME = 'التسجيلات';
var HEADERS = ['الوقت', 'الاسم', 'الفئة', 'متوقع من المبادرة'];

function doPost(e) {
  try {
    var sheet = getOrCreateSheet_();
    ensureHeaders_(sheet);

    var params = (e && e.parameter) ? e.parameter : {};
    var name = String(params.name || '').trim();
    var role = String(params.role || '').trim();
    var expectation = String(params.expectation || '').trim();

    if (!name || !role || !expectation) {
      return json_({ ok: false, error: 'missing_required_fields' });
    }

    sheet.appendRow([
      new Date(),
      name,
      role,
      expectation,
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService
    .createTextOutput('اعرف طريقك — Google Sheets API جاهز')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
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
