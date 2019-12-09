var cap={
    name:"asteve",
agam:function(){
    console.log(this);
    function agam1(){
        console.log(this==global);

    }
    agam1();
},
  alpher:function(){
        console.log(this);
    }
}

var piy=cap.alpher.bind(cap)();
cap=null;
piy();8
