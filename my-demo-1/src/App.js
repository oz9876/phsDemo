import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.theNum=[];
    this.state = {
      tagList : [""],
      tagList2:[]
    }
  }
  setTagList2(){
    let map=[];
    this.state.tagList.map(function(item){
        if(!!item){map.push(parseFloat(item))}
    })
    this.setState({tagList2:map})
  }
  addNew(){
    this.state.tagList.push(null);
    this.setState({"tagList":this.state.tagList});
  }
  delOne(code){
    const self = this;
    return ()=>{
      if(self.state.tagList.length==1){
        alert("再删就没了");
        return;
      }
      delete self.state.tagList[code];
      self.setState({"tagList":self.state.tagList})
      self.setTagList2()
      
    }
  }
  reset(){
    this.setState({
      tagList2:[],
      tagList:[""]
    });
    document.getElementsByClassName("tag-input")[0].value=""
  }
  run(){
    var self = this;
    this.theNum=[];
    //思路：第一个和最后一个值不能是平衡数，
    //如果数组长度小于等于2，则不存在平衡数
    if(this.state.tagList2.length<=2){
      alert("无平衡数");
      return;
    }
    //第2到n-1可能为平衡数
    for(let i=1; i<this.state.tagList2.length-1;i++){
      this.getTheNum(i)
    }
    alert(
      "平衡数游标："
      +this.theNum.join("，")
      +"，平衡数分别是"
      +this.theNum.map(function(i){return self.state.tagList2[i]}).join("，")
    );

  }
  getTheNum(num){
    //假设num元素为平衡数
    const len = this.state.tagList2.length;
    let sum1=0;
    let sum2=0;
    for(let i=0; i<num ; i++){
      sum1+= this.state.tagList2[i];
    }
    for(let i=num+1; i<len ; i++){
      sum2+= this.state.tagList2[i];
    }
    if(sum1==sum2){
      this.theNum.push(num);
      sum1=0;
      sum2=0;
    }
  }
  render() {
    var self = this;
    return (
      <div className="App">
        <div className="app-body">
          <div className="list">
            <div>
              <h3>请输入元素：</h3>
              {
                this.state.tagList.map(function(item,index){
                  return(
                    <div key={index}> 
                      <input key={index} type="number" className="tag-input" defaultValue={item} 
                        onChange={
                          function(e){
                            console.log(e.target.value,index)
                            self.state.tagList[index]=e.target.value;
                            self.setState({tagList:self.state.tagList});
                            self.setTagList2()
                          }
                        }
                      />
                      <button className="del-button" onClick={self.delOne(index)}>删除元素</button>
                    </div>
                  )
                })
              }

            </div>
            <div className="add-div">
              <button className="add-button" onClick={this.addNew.bind(this)}>添加元素</button>
            </div>
            <div className="list2">
              当前有效数组：
              {
                this.state.tagList2.map(function(item,index){
                  return (<p key={index} >{item}</p>)
                })
              }
            </div>
          </div>
          <div className="run-div">
            <button className="reset-button" onClick={this.reset.bind(this)}>重置</button>
            <button className="run-button" onClick={this.run.bind(this)}>计算</button>
          </div>

          <div className="loading"></div>
        </div>
      </div>
    );
  }
}

export default App;
