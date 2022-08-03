class Good{
    constructor(id,name,descriptio,sizes,price,available){
        this.id = id;
        this.name= name;
        this.descriptio = descriptio;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable(statusAvailable){
        this.available = statusAvailable;
    }
}

const good1 = new Good(1,"носки","теплые черные из шерсти",45,400,true)

const good2 = new Good(2,"тапки","вид кошки",40,800,false)
const good3 = new Good(3,"рубашка",",белая с красным воротником",56,3800,true)
const good4 = new Good(4,"Шапка","Теплая вязянная",52,1500,true)
const good5 = new Good(5,"Кросовки","Reebok",44,9000,true)
const good6 = new Good(6,"перчатки","садовые","XXL",200,true)
const good7 = new Good(7,"Шапка из шерсти","Теплая вязянная",52,500,true)
const good8 = new Good(8,"Шапка красная","Теплая вязянная",52,3500,true)

// console.log(good5.available)

// good5.setAvailable(false)
// console.log(good5.available)

const goods = [good1,good2,good3,good6,good4,good8]

// goods.push(good8)



// console.log(goods)

class GoodsList{
        #any_goods;
        constructor(any_goods,filter = "",sortPrice = false,sortDir = false){
        this.#any_goods = any_goods;    
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list(){
        let filter_list = this.#any_goods
        if (this.filter ==="") {
            if (this.sortPrice === true && this.sortDir === true){
                filter_list.sort((el2,el1)=>el2.price-el1.price)
            }
            else{
                if (this.sortPrice === true){
                    filter_list = filter_list.sort((el2,el1)=> el1.price-el2.price)
                }
                // else{

                // }
                
            }
        }
        else{
            filter_list = filter_list.filter((good) =>  this.filter.test(good.name)=== true);
            filter_list.sort((el2,el1)=> el2.price-el1.price)
            
            }
        return filter_list    
    }
    add(new_id,new_name,new_descriptio,new_sizes,new_price,new_available){
        const new_good = new Good(new_id,new_name,new_descriptio,new_sizes,new_price,new_available);
        this.#any_goods.push(new_good); 

    }
    remove(id){
        const index_el = this.#any_goods.findIndex((el)=> el.id===id)
        if (index_el <0){
            console.log("ТОВАРА с ID ",index_el, "НЕТ")

        } 
        else{
            // delete this.#any_goods[index_el]
            this.#any_goods.splice(index_el,1)
            console.log("ВЫ УДАЛИЛИ из списка покупок товар ",{index_el})
        }

    }
    print(){
        console.log(this.#any_goods)
               

    }
 
    
    
}

const list_goods = new GoodsList(goods)
list_goods.filter = /шап/iu
list_goods.sortDir = true;
list_goods.sortPrice = true;


console.log("ВЫВОД GOODS LIST")
console.log(list_goods)
list_goods.print()
console.log("ВЫВОД list")
console.log(list_goods.list)



console.log("ПРОВЕРКА ADD ")
list_goods.add(9,"курта","новая кожанная",54,11111,true)
list_goods.print()

console.log("ПРОВЕРКА remove не сушеств ")
list_goods.remove(23)
list_goods.print()
console.log("ПРОВЕРКА remove id 4 ")

list_goods.remove(4)
list_goods.print()
console.log(list_goods)



class BasketGood extends Good{
    constructor(Good,amount){
        super(Good.id,Good.name,Good.descriptio,Good.sizes,Good.price,Good.available);        
        this.amount=amount;

    }
    
}
const inBacketGood1 = new BasketGood(good4,14)

const inBacketGood2 = new BasketGood(good2,10)
const inBacketGood3 = new BasketGood(good5,1)
const inBacketGood4 = new BasketGood(good7,5)

const BacketGoods =[inBacketGood1,inBacketGood2,inBacketGood3,inBacketGood4]


class Backet {
    constructor(goods){
        this.goods = goods;

    }
    get totalAmount(){
        // const total_amount = this.goods.map((el1) => el1.amount)
        // const amount = total_amount.reduce((item1,item2) => item1+item2)
        const start =0;
        const amount_ = this.goods.reduce((accumulator,i1)=> accumulator+i1.amount,start);
        return amount_;
    }
    get totalSum(){
        const start =0;
        const sum_ = this.goods.reduce((accumulator,el)=> accumulator+(el.price*el.amount),start);
        return sum_;
    }
    clear(){
        this.goods = []

    }
    add (_good,_amount){
        // const list_basket = this.goods.map((el)=> el=el.id)
        const add_amount = this.goods.findIndex((el) => el.id === _good.id);
        if (add_amount === -1){
            const BacketGoodNew = new BasketGood(_good,_amount)
            this.goods.push(BacketGoodNew)
        }
        else{
            this.goods[add_amount].amount += _amount
        }
    }
    remove(_good,_amount){
        const remove_amount = this.goods.findIndex((el) => el.id === _good.id);
        if (remove_amount === -1){
            console.log("ДАННОГО ТОВАРА в КОРЗИНЕ НЕТ")
        }
        else{
            this.goods[remove_amount].amount -= _amount
            if (this.goods[remove_amount].amount <= 0){
                this.goods.splice(remove_amount,1)
            }
        }

    }
    removeUnavaillable(){
        return this.goods = this.goods.filter((el) => el.available != false)
    }
}
 




// const MyBacket = new Backet(BacketGoods)

// console.log("ПРОВЕРКА ОБШЕГО кол-во")
// console.log(MyBacket.goods)

// console.log(MyBacket.totalAmount)
// console.log(MyBacket.totalSum)
// console.log("ПРОверка ДОБАВЛЕНИЯ")
// MyBacket.add(good5,14)

// MyBacket.add(good8,20)

// console.log(MyBacket)

// console.log(MyBacket.totalAmount)
// console.log(MyBacket.totalSum)

// MyBacket.remove(good8,23)

// MyBacket.remove(good8,23)
// console.log(MyBacket.goods)

// console.log(MyBacket)


