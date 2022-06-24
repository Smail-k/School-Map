class Ajax{
	
	constructor (){
		this.xhr = new XMLHttpRequest();
	}
	
	async get(url,params,callback){
		let paramsList = ""; 
		let sep = "?";
		for (let param in params){
			paramsList += sep + param + "=" + params[param]; 
			sep = "&";
		}
		
		this.xhr.open('GET',url+paramsList,true); 
		this.xhr.onreadystatechange=()=>{
			if(this.xhr.readyState == XMLHttpRequest.DONE){
				if(this.xhr.status == 200){
					callback({text : this.xhr.responseText,xml : this.xhr.responseXML});
				}
			}
		}
		this.xhr.send();
	}
	
}