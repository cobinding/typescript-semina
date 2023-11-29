# static type-checking

### 정적 타입이란?

동적 타입 언어와 정적 타입 언어

| 종류 | 동적 타입 언어 | 정적 타입 언어 |
| --- | --- | --- |
| 대표적 예 | Python | TypeScript |
| 실행 방식 | Writing Code → Build → Test → Run | Writing Code → Test → Run |
- 빨간색으로 표현된 부분이 오류를 발견하게 되는 구간이다. 동적 타입 언어는 코드를 쓰고 빌드하는 과정에서 오류를 발견하고, 정적 타입 언어는 테스트와 Run, Deploy할 때 발견한다.

<br>
&nbsp;
<b>정적 타입 검사</b>가 무엇이고, 왜 써야 하는가?

동적 타입 언어로 작성한 코드는 프로젝트가 커질수록 각 객체가 어떤 값을 가지고 있느지 알기가 힘들어진다. 그러므로, 정적 타입 체크를 하는 과정을 의도적으로 추가하기도 한다. 

- Writing → Static Type Checking → Test → Run

<br>

위처럼 의도적인 개입을 하면서까지 정적 타입 검사를 하는 이유는 다음과 같다.

1. 타입 정보가 명시적으로 주어지기에 코드의 가독성이 좋아진다.
2. 타입으로 발생할 수 있는 버그를 예방해준다. → 프로그램을 실행하기 전에 값의 종류를 기반으로 오류를 찾기에 가능하다.

⇒ JS에 타입이 따로 존재하지 않는 TypeScript를 도입함으로써 Github에 프로젝트 배포 시 15%나 버그를 예방했다는 통계도 있다.

<br>
&nbsp;

**TypeScript의 정적 타입**

TS는 프로그램을 실행하기 전에 값의 종류를 기반으로 프로그램 오류를 찾기 때문에, 아래와 같은 예시는 obj 타입 관련 에러가 발생한다.

```jsx
// @errors: 2551
const obj = { width: 10, height: 15 };
const area = obj.width * obj.height;
```

올바른 코드 작성 예시는 다음과 같다. obj의 타입을 구체적으로 작성해주어야 한다.

```tsx
const obj: { width: number, height: number} = { width: 10, height: 15};
const area = obj.width * obj.height;
```

이렇게 객체의 타입을 명시해주게 되면 가독성이 안좋아지기도 한다. 따라서 이 타입에 대한 부분을 별도의 `interface`나 `type`으로 분리를 해서 작성을 해주기도 한다.

```tsx
/* 예를 들어 다음과 같은 name:string과 id:number를 포함하는 객체는 다음과 같이 표현할 수 있다. */

const user = { name: "Hayes", id:0,};

// ----- 타입 인터페이스 만들기 -------
interface User = { 
	name:string;
	id:number;
}

const user: User { name: "Hayes2", id:1,};

// ------ 클래스로 표현하기 --------
class UserAccount {
	name: string;
	id: number;
	
	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}
}

const user:User = new UserAccount("Murphy", 1);
```


<br>
&nbsp;

타입 인터페이스와 맞지 않는 객체를 생성하면 ts가 에러를 발생하여 실수를 줄일 수 있다.

<br>
&nbsp;

타입을 나중에 정의해줄 경우 ? 연산자를 변수뒤에 붙여줌으로써 표현할 수 있다.

```jsx
// @errors: 2551
const obj: { width: number, height: number } = { width: 10, height: 15 };
const area = obj.width * obj.height;

// ? 연산자 
const a = obj?.name
const b = obj.<method>?.() 
```

또 다른 js와 ts의 타입체크의 차이는 다음 예시를 통해 알 수 있다. js에서 예시 코드를 실행하면 구문적 오류가 없기에 `NaN`을 출력한다. 하지만 ts는 배열을 숫자로 나누는 연산이 옳지 않다고 판단하여 오류를 발생시킨다.

```jsx
console.log(4 / []);
```

이와 같이 ts 타입검사자는 일반적인 오류를 최대한 많이 검출하면서 올바른 프로그램을 만들 수 있게 설계되었다.

<br>
&nbsp;

## TypeScript의 런타임 특성

ts는 js의 런타임 특성을 가진 프로그래밍 언어다. 예를 들어, js에서 0으로 나누는 오류는 런타임 예외로 처리하지 않고 `Infinity` 값을 반환한다.  

### tsc와 ts의 컴파일러

js는 컴파일이 필요없는 인터프리터 언어다. 브라우저나 Node.js는 우리가 작성한 js 코드를 있는 그대로 이해하고 바로 실행 가능하도록 한다. 하지만 ts를 도입하고부터 컴파일 과정이 필요해졌다. 그래서 ts로 작성한 코드는 배포될 때 반드시 js로 변환되어야 한다. 브라우저 단에서는 컴파일이 필요한 ts를 처리할 수 없기 때문이다.

tsc는 ts의 컴파일러라고 생각하면 된다. 비슷한 역할은 하지만 완전한 컴파일러는 아니다. 

컴파일러는 소스 코드를 실행하면 전처리된 소스 코드를 어셈블리로 변환한다. 이렇게 변환된 어셈블리파일은 오브젝트파일(완전 기계어, 1010101110000…)로 변환한다. 

그런데 tsc는 Transpilling을 한다. 

- Transpiler란?
    - 한 언어로 작성된 소스코드를 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 것

이러한 tsc를 통해 ts 파일을 js 파일로 변환한다.

[타입스크립트 컴파일러 사용법 (tsc 커맨드)](https://www.daleseo.com/tsc/)

```bash
# ts 설치
npm i -D typescript

# tsc 실행
npx tsc -v
```

<br>
&nbsp;

### 명시적 타입(Exlicit Type)

이러한 정적 타입 검사자를 제공하는 ts에서는 타입을 명시적으로 작성해주는 것이 좋다. 타입을 지정하면 잘못된 타입이 할당되었을 때 오류를 사용자에게 알려주므로 매우 유용하다.

```tsx
let coffee_type:string;

coffee_type = '콜드브루';

coffee_type = 9112304129312;

/*
  [ts] '9120304123' 형식은 'string' 형식에 할당할 수 없습니다.
  let coffee_type: string
*/
```

[타입](https://yamoo9.gitbook.io/typescript/types)

<br>
&nbsp;

### 삭제된 타입(Erased Types)

ts의 컴파일러는 코드 검사를 마치면 타입을 삭제해서 결과적으로 **“컴파일된 코드”**를 만든다. 즉 코드가 한 번 컴파일되면, 결과로 나온 일반 js 코드에는 타입 정보가 없다.

타입 정보가 없다?

ts가 추론한 타입에 따라 프로그램의 특성을 변화시키지 않는다는 뜻이다. 앞서, 정적 타입 언어는 Test와 Run/Deploy 시에 오류 검사를 하는데 이러한 오류 검사 즉, 컴파일 시간이 끝난 타입 시스템 자체는 프로그램이 실행될 때 작동하는 방식과 관련이 없다.

---

<br>
&nbsp;

#### 참고 문서
[TypeScript Basics](https://microsoft.github.io/TypeScript-New-Handbook/chapters/basics/#tsc,-the-typescript-compiler)

[정적 타입 검사(Static Typing)로 더 나은 Python 코드 작성](https://inexperiencedhuman.tistory.com/4)

[210422 TypeScript TIL - 암묵적 타입 정의과 명시적 타입 정의, 배열과 튜플, 변수를 상수로 정의해서 사용하기, 객체의 타입 지정, enum 타입, void, Overloading과 ? 연산자, never과 any 타입, 정의된 타입 재정의, 기존 JavaScript를 TypeScript로 전환하는 경우와 처음부터 TypeScript로 작성하는 경우](https://leehyungi0622.github.io/2021/04/22/202104/210422-Typescript_TIL/)
