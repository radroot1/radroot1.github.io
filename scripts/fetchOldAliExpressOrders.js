async function fetchOldAliExpressOrders(year){
    function printList(items){
        console.log(items)
        var list = []
        for(var key in items){
            var item = items[key]
            for(var key_o in item["orders"]){
                var order = item["orders"]["0"]["url"]["pc"]
                list.push(order)
            }
        }
        console.log(list.join("\n"))
    }
    var res = await fetch("https://aliexpress.ru/aer-jsonapi/bx/orders/v3/web/order-search?_bx-v=2.5.20", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "bx-v": "2.5.20",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://aliexpress.ru/order-list?spm=a2g2w.orderdetail.orders.1.41984aa6tS8sKZ&filterName=archive",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": `{\"page\":1,\"pageSize\":20,\"search\":{\"query\":\"\",\"fromDate\":\"01.01.${year}\",\"toDate\":\"31.12.${year}\"}}`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
});
    var items = (await res.json())["data"]["items"]

    printList(items)

}
