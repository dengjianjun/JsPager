/**
* pageSize,  每页显示数
* pageIndex, 当前页数  
* pageCount  总页数
* url  连接地址
* pager(10, 1, 5, 'Index')使用方法示例
*/
function pager(pageSize, pageIndex, pageCount, url) {
    var intPage = 7;  //数字显示
    var intBeginPage = 0;//开始的页数
    var intEndPage = 0;//结束的页数
    var intCrossPage = parseInt(intPage / 2); //显示的数字

    var strPage = "<div class='fr'><span class='pageinfo'>第 <font color='#FF0000'>" + pageIndex + "/" + pageCount + "</font> 页 每页 <font color='#FF0000'>" + pageSize + "</font> 条</span>";

    if (pageIndex > 1) {
        strPage = strPage + "<a class='pageNav' href='" + url + "?pageIndex=1&pageSize=" + pageSize + "'><span>首页</span></a> ";
        strPage = strPage + "<a class='pageNav' href='" + url + "?pageIndex=" + (pageIndex - 1) + "&pageSize=" + pageSize + "'><span>上一页</span></a> ";
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
                    strPage = strPage + " <a class='current' href='javascript:void(0);'>" + i + "</a> ";
                }
                else {
                    strPage = strPage + " <a class='pageNav' href='" + url + "?pageIndex=" + i + "&pageSize=" + pageSize + "' title='第" + i + "页'>" + i + "</a> ";
                }
            }
        }
    }


    if (pageIndex < pageCount) {
        strPage = strPage + "<a class='pageNav' href='" + url + "?pageIndex=" + (pageIndex + 1) + "&pageSize=" + pageSize + "'><span>下一页</span></a> ";
        strPage = strPage + "<a class='pageNav' href='" + url + "?pageIndex=" + pageCount + "&pageSize=" + pageSize + "'><span>尾页</span></a> ";
    }
    return strPage+"</div>";

}