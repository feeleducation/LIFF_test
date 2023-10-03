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
                   "○参加される日程：\n" + date + "\n" +
                   "○保護者様の氏名：\n" + parentName + "\n" +
                   "○お子様の学年・氏名：\n" + grade_name +
                   "○備考：\n" + remarks;
    
    sendMessage(sendText);
    return false;
});

function sendMessage(sendText) {
    liff.sendMessages([
        {
            type: 'text',
            text: sendText
        }
    ])
    .then(() => {
        // window.alert('メッセージを送信しました');
        console.log('Message Sending success', 'text: ' + sendText);
        liff.closeWindow();
    })
    .catch((error) => {
        console.log('message sending failed ', error, 'text: ' + sendText);
        window.alert('フォームの送信に失敗しました： ' + error + "\nもう1度お試しください。改善されないようでしたらチャットにてお問い合わせください。");
    });
}

const params = (new URL(document.location)).searchParams;
const key = params.get('key');



$(document).ready(function () {
    const liffId = "2000893992-GN6RmgB4"; //LIFF IDを入力
    console.log(`init liff, ID : ${liffId}`);
    initializeLiff(liffId);
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

function childRequired(field){
    if(field.value.length > 0) {
        const elm = document.forms[0].elements;
        for (let i=0; i < elm.length; i++) {
            if (elm[i] == field) {
                elm[i + 1].setAttribute(required, true);
                elm[i + 1].setAttribute(required, true);
                break;
            }
        }
    }
    else {}
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()