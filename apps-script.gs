function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ts = new Date();
  var timestamp = ts.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  var grade = data.grade;

  // 선택 이유 + 소감문 병합 (내용만)
  var combinedReview = [data.selectionReason, data.fairReview]
    .filter(function(v) { return v; })
    .join('\n\n');

  if (grade === 2) {
    // 1학년 → "1학년" 시트
    ss.getSheetByName('1학년').appendRow([
      data.name,
      data.studentId,
      data.sem1Tamgu.join(', '),
      data.sem1Art,
      data.sem1Info,
      data.sem2Tamgu1.join(', '),
      data.sem2Tamgu2,
      data.sem2Art,
      data.sem2Info,
      data.jointCourse || '',
      data.spaceEdu || '',
      timestamp
    ]);

    if (combinedReview) {
      ss.getSheetByName('1학년 소감문').appendRow([
        data.name,
        data.studentId,
        combinedReview
      ]);
    }
  } else if (grade === 3) {
    // 2학년 → "2학년" 시트
    ss.getSheetByName('2학년').appendRow([
      data.name,
      data.studentId,
      data.sem1Gys.join(', '),
      data.sem1Tamgu.join(', '),
      data.sem1Gy,
      data.sem2Gys1.join(', '),
      data.sem2Gys2,
      data.sem2Tamgu.join(', '),
      data.sem2Gy,
      data.jointCourse || '',
      data.spaceEdu || '',
      timestamp
    ]);

    if (combinedReview) {
      ss.getSheetByName('2학년 소감문').appendRow([
        data.name,
        data.studentId,
        combinedReview
      ]);
    }
  }

  return ContentService.createTextOutput('OK');
}
