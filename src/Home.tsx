import * as React from 'react';



class Animal{
  height:number;
  age:number; 
  weight:number;
  sex:string = "red";
  constructor(height = 100, age = 10, weight = 100){
    this.height = height; 
    this.age = age; 
    this.weight = weight; 
  }
  
  show = () => {
    console.log(this.height, this.age, this.weight);
  }
}

class Dog extends Animal{
  color:string = '1';
  constructor(height:number, age:number, weight: number,color: string){
    // super之后 子类中的this就是父类的this（this来自父类）
    super(height,age,weight);
    this.color = color;
  }
  
  s = () => {
    this.show();
    console.log(this.color);
  }
}

export default function Home() {
  let dog = new Animal(200,200,200);
  dog.show();
  let redDog = new Dog(100,100,100,'red');
  redDog.s();
  return (<div>a</div>)
}
