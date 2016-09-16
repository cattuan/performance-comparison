
function run() {

    var address = document.getElementById("txtAddress").value;
    var port = document.getElementById("txtPort").value;
    var quantity = document.getElementById("txtQuantity").value;
    var monitor = document.getElementById("monitor");
    var startTime = new Date().getTime(), sumTimes = 0, success = 0, fail = 0;

    //Clear mang hinh
    monitor.innerText = "";

    //Kiem tra hop le
    if (address === null || address === "" || port === null || port === "" || quantity === null || quantity === "") {
        console.error("Please enter address and port of server as well as quantity of request!");
        return;
    } else if (isNaN(port)) {
        console.error("Please enter number type of value into the port field!");
        return;
    } else if (isNaN(quantity)) {
        console.error("Please enter number type of value into the quantity field!");
        return;
    }

    //Chuyen chuoi thanh so
    quantity = parseInt(quantity);

    //Lap theo quantity lan de tao quantity request cung mot luc den server
    for (var i = 0; i < quantity; i++) {
        (function (i, d) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                updateSta(i, xhr, d);
            };
            xhr.open("GET", "http://" + address + ":" + port, true);
            xhr.send();
        })(i + 1, new Date());
    }

    //Cap nhat trang thai cac hoat dong len mang hinh 
    function updateSta(no, xhr, start) {
        var e = document.createElement("span"), d = new Date();
        switch (xhr.readyState) {
            case 0://Request khong duoc khoi tao
                e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> not initialized.";
                e.style.color = "#aa0000";
                fail++;
                break;
            case 1://Ket noi duoc thanh lap 
                e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> established.";
                break;
            case 2://Server da nhan duoc yeu cau
                e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> received.";
                break;
            case 3://Cho server xu ly request
                e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> is processing by server.";
                break;
            default://Con lai request that bai hoac thanh cong
                if (xhr.status === 200) {//Ket qua thanh cong
                    e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> finished and response is ready.";
                    e.style.color = "#005500";
                    success++;
                    //Cong don khoang thoi gian tu luc bat dau va ket thuc request
                    sumTimes += d.getTime() - start.getTime();
                } else {//Ket qua that bai
                    e.innerHTML = "<i>" + d + "</i>: The request number <b>" + no + "</b> finished and response is fail.";
                    e.style.color = "#aa0000";
                    fail++;
                }
                break;
        }

        //Them mot dong trang thai vao cuoi danh cua mang hinh trinh bay
        monitor.appendChild(e);

        //Xuong dong
        monitor.appendChild(document.createElement("br"));

        //Tinh ket qua cuoi cung khi hoan tat tat ca request        
        if ((fail + success) === quantity) {
            e = document.createElement("P");
            e.innerHTML = "__________________________RESULT_________________________________"            
                + "<br>|  Concurrent Requests: " + quantity                
                + "<br>|  Fail Requests: " + fail
                + "<br>|  Average Response time: " + Math.round(sumTimes / quantity) + " ms"                
                + "<br>|  Toatl Completed time: " + (d.getTime() - startTime) + " ms";                
            monitor.appendChild(e);
        }

        //Cuon xuong cuoi mang hinh
        monitor.scrollTop = monitor.scrollHeight;
    }
}