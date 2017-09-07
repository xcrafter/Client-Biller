export default class RequestBridge 
{
    constructor()
    {
       
        this.endPoint='http://whmaster.subgee.com/api/';
       
    } 
  
    postRequest(endPoint,params)
    {
        this.endPoint=this.endPoint+endPoint;
        console.log(this.endPoint);
        return fetch(this.endPoint, {method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
        })  
    }  


    getRequest(endPoint,params)
    {
         this.endPoint=this.endPoint+endPoint;
        console.log(this.endPoint);
        return fetch(this.endPoint, {  method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
        })
       
    }
  
}