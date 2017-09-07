import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {Link,hashHistory} from 'react-router';
import XLS from 'xlsjs'

export default class Excel extends Component
{


    constructor()
    {
        super();
        this.to_json=this.to_json.bind(this);
        this.fileLoc="";
        this.fileHandle=this.fileHandle.bind(this);
    }
    componentDidMount()
    {
    }
    fileHandle(e)
    {
        var input=e.target;
        var jsonObj,rowObj;
        var reader = new FileReader();
        reader.onload = function(){
        var fileData = reader.result;
        var wb = XLS.read(fileData, {type : 'binary'});
        wb.SheetNames.forEach(function(sheetName){
        rowObj =XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
        jsonObj = JSON.stringify(rowObj);
        localStorage.setItem('item_list',jsonObj);
              
    })
};

    reader.onloadend=function()
    {
        alert('Done Uploading!');   
    }
    reader.readAsBinaryString(input.files[0]);  
    }

to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}

    render()
    {
        return(<div className="app">
             <div className="container-fluid" style={{backgroundColor:'white'}}>
          <div className="row" style={{minHeight:'100'+'px',backgroundColor:'#3498db',
          margin:'inherit',padding:'inherit',paddingTop:25}}>
          <div className="col-md-2">
             <h1 style={{color:'#fff',fontWeight:'bold',marginTop:'2'+'%'}}>FASTBILL</h1>
          </div>

            <div className="col-md-offset-2 col-md-3" style={{paddingTop:10}}>
          
              <button className="btn btn-default" onClick={()=>{
                hashHistory.push('/');
                }}>Back To Biller</button>
            </div>
          </div>
          <div className="row" style={{borderWidth:1,}}>
            <div className="col-md-4">
                <br/>
                <h2>Upload an excel File</h2><hr/>
            
            <input type="file" className="file file-loading" id="files" name="files"
            ref={(input) => { this.fileLoc = input; }} 
            value="D:/estimate/data.xls" onChange={this.fileHandle}/>
            <br/>

              <h4>Sample Format</h4><hr/>
            <img src="images/excel.png" className="img-responsive"/>
            </div>
            <div className="col-md-4 col-md-offset-1">
                <br/>
                <h2>Clear Local Storage</h2><hr/>
                <button className="btn btn-danger btn-lg"
                onClick={()=>{
                    localStorage.clear();
                    alert('Cache Cleared');   
                }}
                >Clear Cached Data</button>    
          </div>
</div>




        </div></div>);
    }
}