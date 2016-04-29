/**
 * apiData.存储用户输入的空气指数数据
 * 示例格式：
 * apiData = {
 * 		'北京':90,
 * 		'上海':40
 * };
 */
var apiData = {};

/**
 * 从用户输入中获取数据，向apiData中增加一条数据
 * 然后渲染api-list列表，增加新增的数据
 */
function addApiData(){
	var city = document.getElementById('api-city-input').value.trim();
	var value = document.getElementById('api-value-input').value.trim();
	if(!city.match(/^[a-z\u4e00-\u9fa5]+$/i)){
		alert('城市名必须为中英文字符');
		return;
	}
	if(!value.match(/^[0-9]+$/)){
		alert('空气质量指数必须为整数');
		return;
	}
	apiData[city] = value;
}

/**
 * 渲染api-table表格
 */

function renderApiList(){
	var tr = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
	var delstr = '<td><button>删除</button></td>';
	for(var item in apiData){
		tr += '<tr><td>' + 	item + '</td><td>' + apiData[item] + '</td>' + delstr + '</tr>';
	}
	document.getElementById('api-table').innerHTML = tr;
}

/**
 * 点击add-btn是的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */

function addBtnHandel(){
	addApiData();
	renderApiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取那个城市数据被删，删除数据，更新表格显示
 */

function delBtnHandel(city){
	delete apiData[city];
	renderApiList();
}

function init(){
	//在下面给add-btn绑定一个点击事件，点击时触发addBtnHandel函数
	document.getElementById('add-btn').onclick = addBtnHandel;
	//想办法给api-table中的所有删除按钮绑定事件触发delBtbHandel函数
	document.getElementById('api-table').onclick = function (e) {
		if(e.target.nodeName.toLowerCase() === 'button'){
			var city = e.target.parentNode.previousSibling.previousSibling.innerText.trim();
			delBtnHandel(city);
		}
	}
}

init();