// Hide alert dialog on button click
let hideAlert = () => {
  document.getElementById('alertDialog').style.display = 'none';
}

let imageArray = [
  'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca8d963483559212f18b75c07fb6302f&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1522308300961-fdb949cac8aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=850933625affc754732eff3b7faef33a&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1523430045879-9444a84c28eb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8f007e7a96b61c930818f2fe9f3b9145&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1518081397142-04b89e08fdfe?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9ff3ee03c233de37fb5586ebefeee8a&auto=format&fit=crop&w=750&q=80,',
  'https://images.unsplash.com/photo-1532510876680-6902bf3645bc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=227c3442e754d3b5869c71b1e2f81a5b&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1520931737576-7d1628862026?ixlib=rb-0.3.5&s=2e4cfafaf1620c0ceddd36b21b659356&auto=format&fit=crop&w=797&q=80',
  'https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c351475860e8248dcd543ebbba1aa24f&auto=format&fit=crop&w=846&q=80',
];

let background = document.getElementById('homeBackground');

setInterval(() => {
  changeBG();
},3000)

let counter = 0;
// Change background image of the landing page
let changeBG = () => {
  if (background) {
    if (counter === imageArray.length) {
      counter = 0;
    }
    background.style.background = `url(${imageArray[counter]}) no-repeat`;
    background.style.backgroundSize = 'cover';
    counter++;
  }
};

