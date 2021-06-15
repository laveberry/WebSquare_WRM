// JSDoc Index 화면(http://127.0.0.1/web/dev/jsdoc/index.html)을 오픈하고 개발자 도구에서 아래의 스크립트를 실행한다.
// apiStr 변수에 Markdown 문법으로 JS Doc API 목록이 생성된다. 

var funcInfos = [];
var funcIndex = 0 ;
var JSDOC_URL = "/web/dev/jsdoc/";

var moduleName = ["com.sbm", "com.data", "com.util", "com.win", "com.num", "com.str", "com.data", "com.ext", "console"];

function loadJs(doc, src) {
	var js = doc.createElement("script");
	js.type = "text/javascript";
	js.src = src;
	doc.body.appendChild(js);
	
	$("#frameID").contents().find("head").append("<script type='text/javascript' src='resources/script/script.js'>");
};

loadJs(document, "/websquare/externalJS/jquery/jquery-1.10.2.min.js");	

for (var moduleIndex = 0; moduleIndex < moduleName.length; moduleIndex++) {
	var apiFrame = document.createElement("iframe");
	var frameId = moduleName[moduleIndex].replace(".", "_");
	apiFrame.setAttribute("id", frameId);
	apiFrame.src = JSDOC_URL + moduleName[moduleIndex] + ".html";
	document.body.appendChild(apiFrame);
	
//	setTimeout(function(frameId) { debugger;
//		var apiDoc = document.getElementById(frameId).contentWindow.document;
//		loadJs(apiDoc, "/websquare/externalJS/jquery/jquery-1.10.2.min.js");	
//	}, 10000);
};

var apiStr = "";
function write(str) {
	apiStr += str + "\n";
};

function createDocument(interval) {
	setTimeout(function() {
		for (var moduleIndex = 0; moduleIndex < moduleName.length; moduleIndex++) {
			var subFuncInfos = [];
			var frameId = moduleName[moduleIndex].replace(".", "_");
			var apiWindow = document.getElementById(frameId).contentWindow;

			apiWindow.$("article > .name").each(function(index, Element) {
				var funcName = moduleName[moduleIndex] + $(this).context.id;
				var url = JSDOC_URL + moduleName[moduleIndex] + ".html#" + $(this).context.id;
				var subFuncInfo = {
					funcName : funcName,
					description : "",
					url : url,
				};
				subFuncInfos[index] = subFuncInfo;
			});

			apiWindow.$("article > div.description").each(function(index, Element) {
				subFuncInfos[index].description = $(this).children().filter("p").text().trim().replace(/\n/gi,"<br>");
			});

			var description = document.getElementById("com_sbm").contentWindow.$("article > .container-overview > .description").text().trim();
			funcInfos[moduleIndex] = {
				moduleName : moduleName[moduleIndex],
				description : description,
				url : "/web/dev/jsdoc/" + moduleName[moduleIndex] + ".html",
				subFuncInfos : subFuncInfos
			}
		}

		for (var moduleIndex = 0; moduleIndex < moduleName.length; moduleIndex++) {
			//write("# <a href='" + funcInfos[moduleIndex].url + "'>"+ moduleIndex + ". " + funcInfos[moduleIndex].moduleName + "</a>");
			write("# "+ funcInfos[moduleIndex].moduleName);
			write(funcInfos[moduleIndex].description);
			write("| API Name | API Description |");
			write("| --- | --- |");

			var subFuncInfos = funcInfos[moduleIndex].subFuncInfos;
			for (var subFuncIndex = 0; subFuncIndex < subFuncInfos.length; subFuncIndex++) {
				write("| <a href='" + subFuncInfos[subFuncIndex].url + "' target='_blank'>"+ subFuncInfos[subFuncIndex].funcName + "</a> | " + subFuncInfos[subFuncIndex].description + " |");
			}
		}

		console.log(apiStr);
	}, interval);
}

createDocument(15000);

//  web\dev\jsdoc\scripts\linenumber.js 파일 하단에 아래의 코드 추가
function includeJs(jsFilePath) {
	var js = document.createElement("script");
	
	js.type = "text/javascript";
	js.src = jsFilePath;
	
	document.body.appendChild(js);
};

includeJs("/websquare/externalJS/jquery/jquery-1.10.2.min.js");

