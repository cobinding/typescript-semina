# 2장

# TS의 자료형

### primitives

- string
- number(int, float 없이 모두 simply number)
- boolean

### null, undefined, object

### Arrays

1. 선언과 할당을 동시에 배열 선언
    
    ```tsx
    let members:string[] = ['유재석', '정준하', '하하'];
    ```
    
2. 선언과 할당을 분리한 선언
    
    ```tsx
    let numbers: string[] = []; // 초기화
    numbers.push(10);
    numbers.push(100);
    ```
    
3. union을 사용한 선언
    
    ```tsx
    let selects:(number | string)[] = [200, 'ok'];
    ```
    
4. 제네릭을 사용한 선언
    
    ```tsx
    let arr:Array<number> = new Array<number>();
    arr.push(5);
    
    let numberArr:Arrya<number> = [10,20,30];
    ```
    

### Tuple

[TypeScript - Tuple(튜플)](http://velog.io/@from_numpy/TypeScript-Tuple튜플)

- 튜플은 **길이와 각 요소마다의 타입이 고정된 배열**이다.

```tsx
let myTuple : [number, boolean, string];

myTuple = [123, true, "practice TypeScript"];
myTuple2 = [true, "practice TypeScript", 123]; //error
```

```tsx
const graph: [x:number, y:number, pointName: string];
```

- 튜플은 고유의 구성요소와 일련된 정보가 있을 때 사용한다.

ex) VIP 유저의 생일일 때 축하 알림 및 쿠폰을 주는 이벤트

```tsx
const userInfo1 = [1, 'user1@ex.com', 'a123', '1999-09-09', true];
```

유저의 고유 인덱스, 아이디, 패스워드, 생일날짜가 기입되는 배열이 존자한다. 이러한 규칙으로 동일하게 다른 사용자들의 정보 또한 변수에 담으면 다음과 같이 동일한 구성으로 가독성 있는 코드를 구현할 수 있다.

```tsx
const userInfo2 = [2, 'user2@ex.com', 'b123', '1999-09-09', true];
const userInfo3 = [3, 'user3@ex.com', 'c123', '2000-01-01', true];
```

만약 이 규칙을 모르는 어떠한 개발자가 아이디와 고유 인덱스, 생년월일, VIP 여부 등을 바꿔서 작성한다면 에러를 발생한다. 

- 앞서, ts의 tuple은 길이와 각 요소의 타입이 고정되어있다고 하였다. 그런데 아이러니하게도 `push` 메소드를 통해 tuple에 새로운 원소를 추가할 수 있다. 이러한 맹점을 차단하기 위해 `readonly` 키워드를 사용할 수 있다.

```tsx
type infoType = readonly [number, string, string, string, boolean];
```

---

### 
# 함수 표현

### TS의 파라미터와 반환값

**TS 파라미터 전달**

```tsx
function greet(name: string) {
	console.log(name.toUpperCase)
} 
```

**TS 반환 리턴값**

```tsx
function getFavoriteNumber(): number {
	return 33;
}
```

**ts 매개변수 특징**

ts는 함수의 인자를 모두 필수값으로 매개변수의 갯수만큼 인자를 넘기지 않아도 되는 js의 특성과 반대된다. 만약 이러한 특성을 살리고싶다면 ?를 이용해서 아래와 같이 정의할 수 있다.

```tsx
function sum(a: number, b?: number): number {
	return a + b ;
}

sum(10, 20); // 30 
sum(10) // 10
sum(10, 20, 30) // error
```

---

# 타입 구성(composing types)

## 유니언(Unions)

여러 타입 중 하나일 수 있음을 선언하는 방법이다.

예를 들어, boolean을 true 또는 false로 설명할 수 있다.

```tsx
type a = true | false;
```

[연산자를 이용한 타입 정의 | 타입스크립트 핸드북](https://joshua1988.github.io/ts/guide/operator.html#union-type)

### 공통 필드를 갖는 유니언

```tsx
interface Bird {
	fly(): void;
	layEggs(): void;
}

interface Fish {
	swim(): void;
	layEggs(): void;
}

declare function getPet(): Fish | Bird;

let pet = getPet();

// 두 개의 타입에 모두 선언된 함수이므로 정상 동작
pet.layEggs(); 

// 두 개의 타입 중 하나에서만 사용할 수 있으므로 Error. 
pet.swim(); 
```

컴파일 타임에서 `getPet` 의 반환값은 union 타입이고, 이값이 union 타입 중 어떤 타입일지는 런타임 시간에 동적으로 결정된다.(동시에 여러 타입이 될 수는 없다.) 따라서 union 타입으로 선언된 투 타입에 호출하는 메소드가 모두 존재한다면 정상적으로 동작한다.

 두 타입에 존재하는 메소드일지라도 동작 방식이 달라, 특정 타입의 특정 메소드를 호출하고 싶은 경우는 다음과 같이 사용한다. 

```tsx
let pet = getPet();

if(pet instance of Bird) {
	pet.layEggs();
} else if (pet instance of Fish) {
	pet.layEggs();
}
```

- 타입 단언, 타입 가드 등 내용 필요

### Union Type의 장점과 Any

- 여러 타입 중 하나가 올 것이라고 가정할 때 사용한다. 이와 비교하여 any 타입을 사용할 수는 있지만 이는 지양하도록 한다.
- 타입 선언을 추가하는 데에 시간을 쏟고싶지 않아서 타입 단언문을 사용하고 싶기도 하다. 그런데 일부 특별한 경우를 제외하고는 any를 사용하면 ts의 장점을 상쇄하게 된다.
    
    
    아래는 Effective Typescript 아이템 3 내용 중 일부이다.
    
    1. any 타입은 타입 안전성이 없다.
    
    ```tsx
    let age:number;
    age ='12'; // string이므로 error
    age = '12' as any; // OK
    ```
    
    이런식으로 타입 체커를 선언에 따라 변경할 수 있는데, 선언에 따라 다른 타입으로 판단하게 될 것이고 혼돈을 걷잡기 힘들어진다.
    
    1. any 함수는 시그니처를 무시한다. 
    
    시그니처를 무시한다는 것은 함수의 파라미터와 반환값에 대한 약속을 어길 수 있다는 뜻이다. 
    
    ```tsx
    function calculateAge(birthDate: Date): number {
    	//
    }
    
    let birthDate:any = '1990-01-19';
    calculateAge(birthDate); // 정상
    ```
    
    birthDate 매개변수에 any 타입을 사용하면 정상작동을 하게되지만 calculateAge의 시그니처를 무시하게 된다. js에서는 종종 암시적으로 타입이 변환되기 때문에 이런 경우 특히 문제가 될 수 있다. 
    
    1. any 타입에는 언어 서비스가 적용되지 않는다. 
    
    ts 언어서비스는 자동완성 기능과 도움말을 제공한다. 그러나 any 타입인 심벌을 사용하면 아무런 도움을 받지 못한다. 
    
    ts의 모토는 ‘확장 가능한 js’이다. any 타입을 사용하면 확장의 핵심 요소인 언어 서비스를 전혀 누릴 수 없기에 ts의 장점을 오히려 상쇄하게 된다.
    
    1. any 타입은 코드 리팩터링 때 버그를 감춘다.
    2. any 타입은 타입 설계를 감춘다.
    3. any는 타입 체커와 타입 스크립트 언어 서비스를 무력화한다.
    
    ```tsx
    /* 
    	any를 사용하는 경우: 
    	age의 타입이 any로 추론되기 때문에 숫자 관련된 API를 작성할 때 코드가 자동 완성되지 않는다.
    */
    
    function getAge(age: any) {
    	age.toFixe(); 
    	return age;
    }
    
    /* 
    	유니온 타입을 사용하는 경우:
    	age의 타입이 number로 추론됨
    */
    
    function getAge(age: number | string) {
    	if (typeof age === 'number') {
    		age.toFixed();
    		return age;
    	}
    
    	if (typeof age === 'string') {
    		return age;
    	}
    	return new TypeError('age must be number or string');
    }
    ```
    

---
### 

## 제네릭(Generics)

제네릭이란 타입을 `string`, `boolean`처럼 명시하지않고 언제든지 변할 수 있도록 한다. **타입을 마치 함수의 파라미터처럼** 사용할 수 있어 프로그래밍에 유연성이 가미된다. 

[📘 타입스크립트 Generic 타입 정복하기](https://inpa.tistory.com/entry/TS-📘-타입스크립트-Generic-타입-정복하기)

[Documentation - Generics](https://www.typescriptlang.org/ko/docs/handbook/2/generics.html)

```tsx
function identity(arg:number): number {
	return arg;
}
```

이런식으로 함수를 작성하면 반드시 특정 타입을 인자로 받고, 특정 타입을 반환해야 한다. any를 사용해서 arg가 어떤 타입이든 받을 수 있도록 설정할 수는 있다. 하지만 이렇게 하게 되면 number 타입을 넘긴다고 해도 any 타입이 반환된다는 한계가 있다. 

```tsx
function add(x: string | number, y: string | number):string | number {
	return x + y;
}
```

이렇게 유니온을 사용한다고 해도, `x: string, y: number` 또는 `x: number, y: string`인 경우에서는 에러를 발생하며 한계를 보인다.

이러한 경우를 union에서는 다음과 같은 함수 오버로딩으로 다룬다.

```tsx
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any) {
	return x + y
}
```

 

하지만 허용할 타입 개수가 만하질수록 코드가 길어지고 가독성이 좋지 않다.

이러한 불편함을 해소하기 위해서 인수의 타입을 제네릭으로 표현하는 것이다. 

```tsx
function add<T>(x: T, y:T): T {
	return x + y;
}

add<number>(1,2);
add<string>('hello', 'world');
```

[제네릭 | 타입스크립트 핸드북](https://joshua1988.github.io/ts/guide/generics.html#제네릭의-한-줄-정의와-예시)

```tsx
// 제네릭 함수를 사용한 예시
function getText<T>(text: T): T {
	return text;
}

// 제네릭 함수 사용 예시
const text1 = getText<string>("Hello Generic");
const text2 = getText("Hello Generic");
```

### 인자값이 배열인 제네릭

```tsx
function logText<T>(text: T[]): T[] {
	console.log(text.length);
	return text;
}
```

위 제네릭 함수는 인자값을 배열 형태의 `T`로 받는다. 이렇게 제네릭을 통해 동적으로 배열 타입을 주면 [1,2,3]처럼 숫자로 이뤄진 배열을 받으면 반환값으로 `number` 배열을 돌려준다.

ts의 제네릭은 다음과 같이 좀 더 명시적으로 선언할 수도 있다.
