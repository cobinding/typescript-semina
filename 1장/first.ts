// @errors: 2551
const obj = { width: 10, height: 15 };
const area = obj.width * obj.height;

// 올바른 작성 예제
const obj: { width: number, height: number} = { width: 10, height: 15};
const area = obj.width * obj.height;


// 예를 들어 다음과 같은 name:string과 id:number를 포함하는 객체는 다음과 같이 표현할 수 있다. */

const user = { name: "Hayes", id:0,};

/* 타입 인터페이스 만들기 */
interface User = { 
	name:string;
	id:number;
}

const user: User { name: "Hayes2", id:1,};

/* 클래스로 표현하기 */
class UserAccount {
	name: string;
	id: number;
	
	constructor(name: string, id: number) {
		this.name = name;
		this.id = id;
	}
}

const user:User = new UserAccount("Murphy", 1);
