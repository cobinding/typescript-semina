# Narrowing

TS에서 타입 검사를 통해 조건을 좁혀서 특정 행동을 하는 것을 통칭하여 `Narrowing`이라고 한다.

<br>
&nbsp;

# Type Assertions

타입 단언은 말 그대로 타입을 단언적으로 명시해주는 것이다. 타입 스크립트가 타입 추론을 통해 판단할 수 있는 타입의 범주를 넘어서는 경우, 더이상 추론하지 않도록 직접 지시한다.

💡타입 단언은 C나 JAVA의 타입 형변환과는 다른 개념이다. 형변환은 실제로 데이터 자료를 변환시키지만, 타입 단언은 실제 데이터를 바꾸는 것이 아니라 타입 정보를 명확히 남기는 것이므로 오직 컴파일 과정의 타입체킹에만 사용된다. (코드 자체에 에러는 발생하지 않지만 실행하다보면 오류를 일으키기도 한다.)

<br>
&nbsp;

### 타입 단언 선언 방법

`document.getElementById` 를 id가 main_canvas인 요소에 적용하면 `HTMLElement` 여러 종류 중 한 가지를 반환한다. 만약, `HTMLCanvasElement`라는 특정 요소를 반환하도록 지정하고 싶다면 타입 단언을 통해 세팅할 수 있다.

1. as 

```tsx
const myCanvas = document.getElemetById("main_canvas") as HTMLCanvasElemet;
```

1. angle-bracket <>

```tsx
const myCanvas = <HTMLCanvasElemet>document.getElementById("main_canvas");
```

- `<>` 방법은 태그 엘리먼트와 문자가 겹칠 수 있으며, 제네릭과 헷갈릴 수 있으니 웬만하면 `as`로 표현하는 것이 추천된다.
- 타입 단언은 해당 변수가 `unknown` 타입일 경우에만 사용하는 걸 추천된다. 나머지 상황일 때는 타입 가드를 이용해 해결하는 것이 좋다. 타입 단언은 개발자가 해당 타입에 확신이 있다고 사용했기에, 컴파일러는 별도로 타입 체크를 하지 않고 데이터의 구조도 신경 쓰지 않게 되므로 오류를 발생할 확률이 높다.
    
    [타입 단언 | 타입스크립트 핸드북](https://joshua1988.github.io/ts/guide/type-assertion.html#타입-단언-type-assertion)

<br>
&nbsp;

---

# Type Guards

타입 가드는 에러를 줄일 수 있는 방어 코드 기법을 말한다. 

```tsx
function padLeft(padding: number | string, input: string ) : string {
    return new Array(padding + 1).join(" ") + input;
}
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4dba05d5-81c1-4de0-a51a-da922d2a1c1a/40f2f616-ea16-4eb8-9a4e-ea4cb3a355f5/Untitled.png)

해당 코드는 padding이 `number`일수도 `string`일수도 있기 때문에 a가 `number`일 경우 에러가 날 것을 TS가 캐치해서 경고를 해준다.

이럴 때는 아래와 같이 `typeof` 키워드를 이용해 조건 분기를 잘 해주면 된다.

```tsx
function padLeft(padding: number | string, input: string ) : string {
    // typeof 없이 return을 하면 padding이 number일 가능성을 TS가 체크하여, ERROR
    if (typeof padding === "number") {
        return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
}
```

<br>
&nbsp;

**[대표적인 타입 가드 operator]**

1. typeof: 일반 타입 체킹
2. instanceof: 클래스 체킹
3. Array.isArray(): 배열 체킹
4. .type/in: 객체 속성 체킹

[📘 타입 추론 / 타입 호환 / 타입 단언 / 타입 가드 💯 총정리](https://inpa.tistory.com/entry/TS-📘-타입-추론-타입-호환-타입-단언-타입-가드-💯-총정리#타입_단언_assertions)

<br>
이러한 키워드는 모두 JS 코드이다. 하지만 JS에서는 타입 선언이 유연하기 때문에 이 연산자들을 쓸 일이 별로 없다. 하지만 TS는 타입 체킹을 중요시하므로 TS에서 많이 쓰인다.

<br>
&nbsp;


### Truthiness Narrowing

TS에서 `&&`, `||`, `if`와 같은 조건문, `!`와 같은 연산자를 통해 narrowing을 할 수 있다.

위에서 살펴보았던 padLeft 함수 인자인 **padding**에 `| null`을 추가하여 `nul`l이 넘어올 수 있다고 가정해보자.

그럼, `null`을 narrowing하기 위해 `if(padding)`을 추가해줄 수 있다. 하지만 이렇게 널 체크를 하면 빈 문자열 (’ ‘) 또한 false로 반환하여 원하는 대로 동작하지 않는다.

[ `if (padding !== null)`로 해결]

```tsx
function padLeft(padding: number | string | null, input: string) : string {
    if (padding !== null) {
        if (typeof padding === 'number') {
            return new Array(padding + 1).join(' ') + input;
        }
        return padding + input;
    }
    return input;
}
```

<br>
&nbsp;

### Equality Narrowing

```tsx
function func1 (x: string | number, y: string | boolean) {
    if (x === y) {
        x.toUpperCase();
        y.toUpperCase();
    } else {
        console.log(x, y);
    }
}
```

x와 y의 값과 타입이 같은 경우를 if 분기로 체크한 다음, 연산을 수행할 수 있도록 Equality Narrowing을 한 예제이다.

<br>
&nbsp;


### `in` Operator Narrowing

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4dba05d5-81c1-4de0-a51a-da922d2a1c1a/856f3a13-e2b5-46b8-ac7b-a248fa0d149d/Untitled.png)

`if (’swim’ in animal)` 을 사용함으로써 animal에 swim이라는 프로퍼티가 존재하는지 확인하고, 존재한다면 animal의 union 중 어떤 값인지에 대한 사실을 알게되는 것이다. 그래서 if 문 밖의 animal은 Cat임을 알고, 위 사진처럼 jump 프로퍼티에 대한 자동완성을 해준다.

<br>
&nbsp;


### `instanceof` Narrowing

```tsx
function logVal(x: Date | string) {
	if (x instanceof Date) {
		// x의 parameter : Date
		console.log(x.toUTCString());
	}
	else {
		// x의 parameter : string
		console.log(x.toUpperCate());
	}
}
```

instanceof: x가 다른 값의 인스턴스인지 아닌지 확인하는 연산자

<br>
&nbsp;


### Discriminated Unions

```tsx
// ? optional으로 circle이면 radis를, square면 sideLength를 사용.
interface Shape {
    kind: 'circle' | 'square';
    radius?: number;
    sideLength?: number;
}

function getArea (shape: Shape){
    if (shape.kind === 'circle') {
        return Math.PI * shape.radius ** 2;
    }
}
```

Shape 인터페이스에서 redius는 옵셔널하게 선언되었다. 이 뜻은 해당 속성이 없을 수도 있다는 뜻이다. 따라서 TS 컴파일러는 shape.radius가 undefined일 수 있다는 가능성을 경고한다.

```tsx
interface Circle {
		kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    sideLength: number;
}

type Shape = Circle | Square;

function getArea (shape: Shape){
    switch(shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square' : 
            return shape.sideLength ** 2;
    }
 }
```

이와 같이 인터페이스를 분리하고 switch-case 문으로 간결명료하게 구현할 수 있다.

⇒ composition over the inheritence

kind 프로퍼티를 통해 TS에서 다양한 타입을 명시할 수 있다.
