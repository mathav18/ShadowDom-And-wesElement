var host=document.querySelector('.shadowHost');
let clientHeight=host.offsetHeight;
let hostScrollTop;
let current__Y__Position=0;
let elementCount=0;
let ElementArray=[]
let boxCount=0;
let n=1;
let startIndex=1;
let endIndex=7;
let t=0;

let  removeELementArray=[];


class person extends HTMLElement{

    constructor(){
        super();


//CREATE SHADOW ROOT
        var shadowRoot=host.attachShadow({mode:'open'});
        const elementRoot=document.createElement('div');
        elementRoot.className="scroller"
      
//ELEMENT STYLE
        shadowRoot.innerHTML+=
        `<style>
        .boxes {
            height: 100px;
            width: 900px;
            border-radius: 5px;
            background:white;
            margin-top:20px;
            border-left:5px solid;
            font-size:30px;
            scroll-behavior:smooth ;
          }
      </style>
    `;


//STATIC ELEMENT CREATE
    for(let i=0;i<10;i++){ 
       
        const fNameE1=document.createElement('div')
        fNameE1.className="boxes";
        boxCount++;
        fNameE1.innerText=`${boxCount}  BOX`
        elementRoot.append(fNameE1);
        ElementArray.push(fNameE1)
        elementCount++;

  }


      
//ONSCROLL ON ADD ELEMENT FUNCTION
      this.scrollerFunc=()=>{
    
      let temp__Y__position=host.scrollTop
  if(temp__Y__position>current__Y__Position){
        const {scrollTop,scrollHeight,clientHeight}=host;
             if(scrollTop+clientHeight>=scrollHeight-10)
                 this.renderItem();
     

              }else{
                 this.upScrollRenderElement(removeELementArray);
              }
      }
//ELEMENT RENDERING
 
this.renderItem=()=>{
            for(let i=0;i<5;i++){
             const fNameE1=document.createElement('div')
             fNameE1.className="boxes";
             ElementArray.push(fNameE1)
             elementRoot.append(fNameE1);
             this.elem=ElementArray[0];
             ElementArray.shift();
            this.hide(this.elem)
            removeELementArray.push(this.elem)
            boxCount++;
           fNameE1.innerText=`${boxCount}  BOX`;
            }
    }

//SCROLL REVERSE FUNCTION
this.upScrollRenderElement=(arr)=>{
  
     let elem=arr[arr.length-1];
     ElementArray.unshift(elem);
     arr.pop();
     
    let a=1;
     for(let i=arr.length-1;i>=0;i--){
        elem=arr[i];
        elementRoot.prepend(elem);
        console.log(   ElementArray[ElementArray.length-a])
   ElementArray[ElementArray.length-a].remove();
       ElementArray.pop();
       a++;
     }
  
    }


    this.hide=(e)=>{
   
    e!=undefined?e.remove():''

      }

 
    host.addEventListener('scroll',this.scrollerFunc)
    shadowRoot.append(elementRoot)
}
}

customElements.define('person-name',person)

