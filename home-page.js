let newLinkBox = document.getElementById('input');
let addButton = document.getElementById('add');
let showCount = document.getElementById('showCount');
let comicArea = document.getElementById('comicArea');

// reseta()  ;
showCount.innerHTML = `The number of comics you are following: ${localStorage.comicCount}`
updateComicArea();

function addNewComic() {
    manageCount();

    let newComicLink = newLinkBox.value;
    localStorage.setItem(String(localStorage.comicCount), newComicLink);
    updateComicArea();
}

function manageCount() {
    if(localStorage.comicCount) {
        localStorage.comicCount = Number(localStorage.comicCount) + 1;
    } else {
        localStorage.comicCount = 0;
    }

    showCount.innerHTML = `The number of comics you are following: ${localStorage.comicCount}`
}

function reseta() {
    localStorage.clear();
    manageCount();
    updateComicArea();
}

function updateComicArea() {
    comicArea.innerHTML = '';
    for (i = 1; i <= localStorage.comicCount; i++) {
        let newNode = document.createElement('a');
        newNode.classList.add("col-3");
        newNode.href = localStorage[String(i)];
        setCardStyle(newNode);
        setCardContent(newNode);
        
        comicArea.appendChild(newNode);
    }
}

function setCardStyle(newNode) {
    newNode.style.height = '550px';
    newNode.style.overflow = 'hidden';
}

function setCardContent(newNode) {
    newNode.innerHTML = ``; //important code
    
    if (localStorage[String(i)].includes("cmangab")) {
        newNode.innerHTML += cmanga(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("truyentranhaudio")) {
        newNode.innerHTML += truyentranhaudio(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("baotangtruyenhot")) {
        newNode.innerHTML += baotangtruyenhot(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("blogtruyen")) {
        newNode.innerHTML += blogtruyen(localStorage[String(i)])
    } else if (localStorage[String(i)].includes("vlogtruyen")) {
        newNode.innerHTML += vlogtruyen(localStorage[String(i)])
    }
}

function cmanga(link) {
    let req = new XMLHttpRequest();
    req.open("GET", link, false);
    req.send(null);
    let htmlCode = req.responseText;
    return getComicAvatar() + `<br>` + getComicName() + `<br>` + getChapterList();

    function getComicAvatar() {
        let openIndex = htmlCode.indexOf('<img itemprop="image"');
        let cutString = htmlCode.slice(openIndex, openIndex + 125);
        let srcIndex = cutString.indexOf('src');

        cutString = cutString.slice(srcIndex, srcIndex + 125);
        let start = cutString.indexOf('"');
        let end = cutString.indexOf('" ');
        let avatarLink = "https://cmangab.com/" + cutString.slice(start + 1, end);

        return `<img class="avatar" src="${avatarLink}">`;
    }

    function getComicName() {
        let start = htmlCode.indexOf('<title>');
        let end = htmlCode.indexOf(' [');
        let comicName = htmlCode.slice(start + 7, end);
        
        while (comicName.length > 22) {
            let last = comicName.lastIndexOf(" ");
            comicName = comicName.slice(0, last);
        }

        return `<h1 class="comicName">${comicName}</h1>`
    }

    function getChapterList() { //on coding this function

        let openIndex = htmlCode.indexOf("list_chapter");
        let cutString = htmlCode.slice(openIndex, openIndex + 1000);
        // console.log(cutString);
        console.log(htmlCode);

        return ``;
    }
}



/*
To do:
(Áp dụng với cmangab.com trước)
V Giao diện cơ bản
V Thêm link
V Disable CORS
V Đọc link, đọc code web link
V Hiện ảnh 
V Hiện tên, tên quá dài thì cắt bớt chữ
- Đọc chap, hiện 3 chap mới nhất
- Thêm nút xóa truyện
- Check link hợp lệ, check link này có thuộc về những web đã được xử lý hay không, check đã tồn tại
- Sắp xếp theo thứ tự cập nhật

*/
