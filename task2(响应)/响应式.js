const targetMap = new WeakMap(); //储存这些reactive obj 的依赖
let dep = new Set() //创建集合，因为
let activeEffect = null

function track(target, key) { //存储依赖项
    if (activeEffect) {  //我们只想在有activeEffect时才进行下列操作
        let depsMap = targetMap.get(target) //获取这个相应的对象的依赖项
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map())) //如果不存在，就先给他创造一个空的
        }
        let dep = depsMap.get(key) //获取属性的依赖项
        if (!dep) {
            depsMap.set(key, (dep = new Set())) //同理
        }
        dep.add(activeEffect) //把effect添加到这个个依赖的副作用中
    }
}
//检查target是否有依赖
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return; //没有的话就拜拜
    const dep = depsMap.get(key); //有的话就把这个属性的依赖取出来
    if (!dep) return
    dep.forEach(effect => effect()) //然后遍历，执行，这个属性的所有依赖

}
/* track(obj, "n1")
effect()
console.log(total)好
obj.n1 = 12
console.log(total)
trigger(obj, "n1")
console.log(total) */

//下面让我们实现自动更新
function reactive(target) {
    const handler = {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver);
            track(target, key) //这让我们在有使用到所追踪的东西时，可以自动添加他的所有的effect
            return result
        },
        set(target, key, value) {
            let result = Reflect.set(target, key, value);
            trigger(target, key) //触发依赖，实现“自动更新
            return result;
        }
    }
    return new Proxy(target, handler) //给这个目标对象，榜上代理，这样以后每次修改对象什么属性的话可以实现自动更新
}

//但是我们只想在effect调用我们的追踪函数
//所以我们引入一个activeEffect变量去保存我们的所有依赖
function effect(eff) { //我们同时也需要更新我们的追踪函数，当调用activeEffect时，同时更新他所在的依赖
    activeEffect = eff
    activeEffect()
    activeEffect = null
}

//但是我们如果有一个依赖是依靠外部变量的，这个外部变量和这个响应式对象的某一个属性的值有关
//那我们修改这个有关的值，确实会影响这个外部变量，但是也可能会影响我们之前所创建的“响应式”，具体见下列测试代码
/* let product = reactive({ price: 10, quantity: 2 });
let total = 0, salePrice = 0;

effect(() => total = salePrice * product.quantity);
effect(() => salePrice = product.price * 0.9);
console.log(total, salePrice);  // 0 9

product.quantity = 5;
console.log(total, salePrice);  // 45 9

product.price = 20;
console.log(total, salePrice);  // 45 18 */ //注意这里的total其实是应该生变化的，但我们的salePrice并不是响应式的，所以并没有发生变化，所以我们引入Ref这个“工具人”

//Ref只有一个属性value
function ref(raw) {
    const r = {
        get value() {
            track(r, "value") //Ref只有一个属性value,追踪value
            return raw
        },
        set value(newvalue) {
            if (raw !== newvalue) { //如果不等于之前的值的话就不用执行这一步，因为如果执行的话会一直循环
                raw = newvalue
                trigger(r, "value")
            }
        }
    }
    return r
}
//测试 
let product = reactive({ price: 10, quantity: 2 });
let total = 0, salePrice = ref(0);

effect(() => { total = salePrice.value * product.quantity });
effect(() => { salePrice.value = product.price * 0.9 });

console.log(total, salePrice.value); // 18 9

product.quantity = 5;
console.log(total, salePrice.value); // 45 9

product.price = 20;
console.log(total, salePrice.value);


//*下面我们用computed实现一下

function computed(getter) {
    console.log(getter);
    let result = ref() //利用 ref来设置这个result，使我们后续可以在改变result属性时，实现响应式更新
    effect(() => (result.value = getter()))  //存储副作用

    return result
}

//测试
/* let product = reactive({ price: 10, quantity: 2 });
let salePrice = computed(() => {
    return product.price * 0.9;
})
let total = computed(() => {
    return salePrice.value * product.quantity;
})

console.log(total.value, salePrice.value);//18 9
product.quantity = 5;
console.log(total.value, salePrice.value); //45 9
product.price = 20; */