function make(){
    let name = 'Artiom';
    function display() {
        alert(name);
    }
    return display;
};

let x = make();
x()