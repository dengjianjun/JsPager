/**
* pageSize,  每页显示数
* pageIndex, 当前页数  
* pageCount  总页数
* url  连接地址
* pager(10, 1, 5, 'Index')使用方法示例
* 页面需要引入bootstrap.css
*/
function pager(pageSize, pageIndex, pageCount, url) {
    var intPage = 7;  //数字显示最多显示7个数字
    var intBeginPage = 0;//开始的页数
    var intEndPage = 0;//结束的页数
    var intCrossPage = parseInt(intPage / 2); //显示的数字
    //pageIndex(5, page, pageCount, 'init(')使用方法示例

    var strPage = "<ul class='pagination pagination-right'><li class='disabled'> <a href='javascript:void(0);'>第" + pageIndex + "/" + pageCount + " 页 每页 " + pageSize + " 条</a> &nbsp;&nbsp;&nbsp;&nbsp;</li>";

    if (pageIndex > 1) {
        strPage = strPage + "<li><a class='page' href='" + url + "?pageIndex=1&pageSize=" + pageSize + "'>首页</a></li> ";
        strPage = strPage + "<li><a class='page' href='" + url + "?pageIndex=" + (pageIndex - 1) + "&pageSize=" + pageSize + "'>上一页</a><li> ";
    }
    if (pageCount > intPage) {//总页数大于在页面显示的页数

        if (pageIndex > pageCount - intCrossPage) {//当前页数>总页数-3
            intBeginPage = pageCount - intPage + 1;
            intEndPage = pageCount;
        }
        else {
            if (pageIndex <= intPage - intCrossPage) {
                intBeginPage = 1;
                intEndPage = intPage;
            }
            else {
                intBeginPage = pageIndex - intCrossPage;
                intEndPage = pageIndex + intCrossPage;
            }
        }
    } else {
        intBeginPage = 1;
        intEndPage = pageCount;
    }

    if (pageCount > 0) {
        for (var i = intBeginPage; i <= intEndPage; i++) {
            {
                if (i == pageIndex) {//当前页
                    strPage = strPage + "<li class='active'> <a href='javascript:void(0);'>" + i + "</a> </li>";
                }
                else {
                    strPage = strPage + " <li><a class='page' href='" + url + "?pageIndex=" + i + "&pageSize=" + pageSize + "' title='第" + i + "页'>" + i + "</a></li> ";
                }
            }
        }
    }


    if (pageIndex < pageCount) {
        strPage = strPage + "<li><a class='page' href='" + url + "?pageIndex=" + (pageIndex + 1) + "&pageSize=" + pageSize + "'>下一页</a></li> ";
        strPage = strPage + "<li><a class='page' href='" + url + "?pageIndex=" + pageCount + "&pageSize=" + pageSize + "'>尾页</a></li> ";
    }
    strPage += "</ul>";
    return strPage;

}