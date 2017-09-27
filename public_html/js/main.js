class Bookmark {

    constructor(siteName, url) {
        this.siteName = siteName;
        this.url = url;
    }

}

function saveBookmark() {

    let site = document.getElementById('siteName').value;
    let url = document.getElementById('siteUrl').value;

    let bookmark = new Bookmark(site, url);

    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));    //stringify - return json into string
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));   //parse - retrun string into json
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
//    fetchBookmark();
    changePage(numPages());

}

function deleteBookmark (url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//    fetchBookmark();
    changePage(0);

}

//function fetchBookmark() {
//    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//
//    let result = document.getElementById('bookmark');
//    result.innerHTML = '';
//
//    if (bookmarks.length !== null || bookmarks.length !== 0) {
//        for (let i = 0; i < bookmarks.length; i++) {
//            let name = bookmarks[i].siteName;
//            let url = bookmarks[i].url;
//            result.innerHTML += '<div class="well">' +
//                                    '<p>' + name + '</p>' +
//                                    '<a href="' + url + '" class="btn btn-default">Visit</a>' +
//                                    '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger">Delete</a>' +
//                                '</div>';
//        }
//    }
//
//}



document.getElementById('addButton').addEventListener('click', saveBookmark);

//////////////////////////////////////////////////////////////////

var current_page = 1;
var records_per_page = 5;

var objJson = JSON.parse(localStorage.getItem('bookmarks'));

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";
    
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if (bookmarks.length !== null || bookmarks.length !== 0) {
        for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {    
            let name = bookmarks[i].siteName;
            let url = bookmarks[i].url;
            let partOfUrl = url.substring(32);
            let embedUrl = "https://www.youtube.com/embed/" + partOfUrl;

            listing_table.innerHTML += '<div class="well">' +
                                            '<p>' + name + '</p>' +
                                            '<a href="' + url + '" class="btn btn-default">Visit</a>' +
                                            '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger">Delete</a>' +
                                            '<div class="clearfix"></div>' +
                                            '<div class="row">' +
                                                '<div class="col-md-3">' +'</div>' +
                                                '<div class="col-md-9">' +
                                                    '<div class="embed-responsive embed-responsive-16by9">' +
                                                        '<iframe class="embed-responsive-item" src="' + embedUrl + '"></iframe>' + 
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>';
        }
    }

    page_span.innerHTML = page;

    if (page === 1) {
        btn_prev.setAttribute("class", "disabled");
    } else {
        btn_prev.removeAttribute("class");
    }

    if (page === numPages()) {
        btn_next.setAttribute("class", "disabled");
    } else {
        btn_next.removeAttribute("class");
    }
}

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};

