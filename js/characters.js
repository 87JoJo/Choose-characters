(() => {


    // 加減
    const minus = Array.from(document.querySelectorAll('.minus'));
    const pluse = Array.from(document.querySelectorAll('.pluse'));
    // 大標
    const title = document.querySelector('.title-3 p')
    // 角色詳情
    const detail = document.querySelector('.detail');
    const detailP = document.querySelector('.detail .introduce p');
    // characters
    const characters = Array.from(document.querySelectorAll('.character'));
    // skills
    const skillTotalPoints = document.querySelector('.skill .skillTotal span');
    // points
    const points = Array.from(document.querySelectorAll('.skill .skillPoints p'));
    // ok
    const submit = document.querySelector('.submit a');
    // modal
    const modal = document.querySelector('.modal');
    // close
    const close = document.querySelector('.modal-header span');
    // modalContent 
    const modalContent = document.querySelector('.modal-body p');
    // 總點數
    let total = 0;
    // 剩餘點數
    let leftPoint = 20;
    // 資料
    let data = null;
    // 職業
    let role = "";
    // 獲取資料
    function reqHandler() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
            data = JSON.parse(this.response);
        } else {
            console.log('HTTP error');
        }
    }
    let req = new XMLHttpRequest();
    req.addEventListener('load', reqHandler);
    req.open('GET', './../data/character.json', true);
    req.send();

    // 過濾資料
    function DataHandler() {
        // 獲取當前點擊的名字
        let name = this.querySelector('.name p').textContent;
        // console.log(data.character);
        const html = (data.character)
            .map(item => {
                console.log(item);

                // 比對名字，顯示對應詳情
                if (item.name == name) {
                    return item.detail;
                }
            });
        detailP.textContent = html;
    }

    // 切換角色，顯示詳情並初始化
    function detailHandler() {
        // 初始化
        leftPoint = 20;
        total = 0;
        skillTotalPoints.textContent = `${ leftPoint }`;
        // 清空所有點數
        let points = Array.from(detail.querySelectorAll('.skillPoints p'));
        points.map(point => {
            point.textContent = "0";
        });
        detail.classList.add('active');
    }
    // 配點全部加起來最高為20
    // 減法判斷
    function minusHandler() {
        let point = this.parentNode.querySelector('.skillPoints p');
        if (parseInt(point.textContent) > 0 && total <= 20) {
            point.textContent = ((parseInt(point.textContent)) - 1).toString();
            if (leftPoint >= 0 && leftPoint < 20) {
                leftPoint++;
                skillTotalPoints.textContent = `${ leftPoint }`;
            }
        } else {
            point.textContent = "0";
        }
        if (total > 0 && parseInt(point.textContent) > 0) {
            total--;
        } else {
            return 0;
        }
        console.log(leftPoint);
        console.log(total);
    }
    // 加法判斷
    function pluseHandler(e) {
        let point = this.parentNode.querySelector('.skillPoints p');
        // 如果取整後>0 && <20 才能進去
        if (parseInt(point.textContent) >= 0 && parseInt(point.textContent) < 20) {
            // 如果全部配點已經20，就跳出
            if (total == 20 && leftPoint == 0) {
                return 0;
            }
            // 改變對應p的內容
            point.textContent = ((parseInt(point.textContent)) + 1).toString();
            // 剩餘點數
            if (leftPoint > 0 && leftPoint <= 20) {
                leftPoint--;
                skillTotalPoints.textContent = `${ leftPoint }`;
            }

        } else {
            // 如果加到20保持在20
            point.textContent = "20";
        }
        // 計算總配點
        if (total < 20) {
            total++;

        } else {
            return 0;
        }
        console.log(leftPoint);
        console.log(total);
    };
    // 亂數
    setInterval(() => {
        let random1 = Math.random() * (256 - 0 + 1) + 0;
        let random2 = Math.random() * (256 - 0 + 1) + 0;
        let random3 = Math.random() * (256 - 0 + 1) + 0;
        title.style.color = `rgb(${random1}, ${random2}, ${random3})`;
    }, 1000);

    skillTotalPoints.textContent = `${ leftPoint }`;

    // modal
    function modalHandler() {
        modal.style.visibility = 'visible';
        window.onclick = (e) => {
            if (e.target.className == 'modal') {
                modal.style.visibility = 'hidden';
            }
        };
    };
    // role 
    function roleHandler() {
        if (!total == 20) {
            return;
        }
        filterHandler(points[0], points[1], points[2], points[3]);

    }
    // roleFilter
    function filterHandler(Str, Dex, Int, Luk) {
        console.log(data.role);

        let S = parseInt(Str.textContent);
        let D = parseInt(Dex.textContent);
        let I = parseInt(Int.textContent);
        let L = parseInt(Luk.textContent);

        (S > 6 && D > 6) ? role = "Warrior": (D > 6 && I > 6) ? role = "Hunter" :
            (I > 6 && L > 6) ? role = "Wizard" : (D > 6 && L > 6) ? role = "Assassin" :
            role = "Sucker";
        console.log(role);
        const roleData = data.role.map(name => {
            if (role == name.name) {
                return name;
            }
        }).find(name => {
            if (name) {
                return name;
            }
        });
        modalContent.innerHTML = roleData.detail;
    }

    // 點擊角色顯示對應詳情
    characters.forEach(item => {
        item.addEventListener('click', detailHandler);
        item.addEventListener('click', DataHandler);
    });

    minus.forEach(item => {
        item.addEventListener('click', minusHandler);
    });

    pluse.forEach(item => {
        item.addEventListener('click', pluseHandler);
    });
    // 關閉modal
    close.addEventListener('click', () => {
        modal.style.visibility = 'hidden';
    });
    // 跳出modal
    submit.addEventListener('click', modalHandler);
    submit.addEventListener('click', roleHandler);
})();