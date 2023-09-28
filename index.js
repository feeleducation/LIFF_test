$('form').submit(function (event) {
    const grade = [$('select[name="grade2"]').val(), $('select[name="grade3"]').val(), $('select[name="grade4"]').val()];
    const name = [$('input[name="name2"]').val(), $('input[name="name3"]').val(), $('input[name="name4"]').val()];
    let grade_name = ($('select[name="grade1"]').val() + "・" + $('input[name="name1"]').val() + "\n");

    for (let i = 0; i < 3; i++) {
        if ((!grade[i] && name[i]) || (grade[i] && !name[i])) {
            window.alert("お子様の学年、氏名は両方入力してください。（" + String(i + 2) + "列目）");
            return false;
        }
        if (grade[i]) {
            grade_name += grade[i] + "・" + name[i] + "\n";
        }
    }
    if (window.confirm('フォームを送信しますか？')) {
    }
    else {
        return false; // 「キャンセル」なら送信しない
    }

    const date = $('select[name="date"]').val();
    const parentName = $('input[name="parent-name"]').val();
    const remarks = $('textarea[name="remarks"]').val();

    let sendText = "【理科実験教室参加申込】\n\n" +
                   "参加される日程：" + date + "\n" +
                   "保護者様の氏名：" + parentName + "\n" +
                   "お子様の学年・氏名：\n" + grade_name +
                   "備考：\n" + remarks;

    snedMessage(sendText);
    return false;
});

function sendMEssage(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('フォームの送信に失敗しました： ' + error);
    });
}

const params = (new URL(document.location)).searchParams;
const key = params.get('key');



$(document).ready(function () {
    // liffId: LIFF URL "https://liff.line.me/xxx"のxxxに該当する箇所
    // LINE DevelopersのLIFF画面より確認可能
    const liffId = "2000893992-BllmbvgN"; //LIFF IDを入力
    console.log(`init liff, ID : ${liffId}`);
    initializeLiff(liffId);
    getUserId(liffId);
})


function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            // Webブラウザからアクセスされた場合は、LINEにログインする
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login({ redirectUri: location.href });
            } else {
                console.log('Login Success');
            }
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}
