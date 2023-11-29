/* 주요 소스 코드 */


// 공통 필드를 갖는 유니언
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


// any와 union 비교

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
