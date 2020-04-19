const r = Math.min(window.innerWidth, window.innerHeight) / 2.5,
    secMinScale = d3.scaleLinear().domain([0, 60]).range([0, 360]),
    hourScale = d3.scaleLinear().domain([0, 12]).range([0, 360])

const pointersRelDimensions = [
    { class: 'hour', width: 0.05, height: 0.55 },
    { class: 'min', width: 0.05, height: 0.85 },
    { class: 'sec', width: 0.02, height: 0.85 }
]

// Size canvas
const svg = d3.select('#canvas')
    .attr('width', r * 2)
    .attr('height', r * 2)
    .attr('viewBox', `${-r} ${-r} ${r*2} ${r*2}`)

// Add background
svg.append('circle').classed('background', true)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', r)

// Add axis
svg.append('g').classed('axis', true)
    .call(d3.axisRadialInner(
            hourScale.copy().range([0, 2 * Math.PI]),
            r - 1
        )
        .ticks(12)
        .tickSize(12)
    )

svg.append('g').classed('minor-ticks', true)
    .call(d3.axisRadialInner(
            secMinScale.copy().range([0, 2 * Math.PI]),
            r - 1
        )
        .ticks(60)
        .tickSize(6)
    )

// Add pointers
svg.append('g').classed('pointers', true)
    .attr('transform', `scale(${r})`)
    .selectAll('rect')
        .data(pointersRelDimensions)
        .enter()
            .append('rect')
            .attr('class', d=> d.class)
            .attr('x', d => -d.width/2)
            .attr('y', d => -d.height + d.width/2)
            .attr('width', d => d.width)
            .attr('height', d => d.height)
            .attr('rx', 0.02)
            .attr('ry', 0.03)

// Add center
svg.select('.pointers')
    .append('circle').classed('center', true)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 0.02)

// Kick-off clock
g=0;
n=0;
secs=0;
var an=0;
var m,h;
var hr,mn,sc,hr1,mn1,sc1,speed,k=-2;
//framed()
function fram()
{

  if(g==0){
  framed();
  f();
}
}

function framed() {
    /*const dt = new Date()

    //const ms = dt.getMilliseconds(),
        secs = dt.getSeconds() + ms/1000,
        mins = dt.getMinutes() + secs/60,
        hours = dt.getHours()%12 + mins/60
        */



        mins=secs/60;
        hours=mins/60;

    d3.select('.pointers .hour').attr('transform', `rotate(${hourScale(hours)})`)
    d3.select('.pointers .min').attr('transform', `rotate(${secMinScale(mins)})`)
    d3.select('.pointers .sec').attr('transform', `rotate(${secMinScale(secs)})`)

    h=hourScale(hours)
    m=secMinScale(mins)

/*
    document.getElementById('hr').value=h;
    document.getElementById('mn').value=m;
    document.getElementById('sc').value=secs%60;*/

    cc=  parseInt(document.getElementById('Agl').value);

    if(eq(ra(m-h),cc))
    {

      hh=parseInt(secs/3600);
      mm=parseInt(secs/60-hh*60);
      ss=parseInt(secs-mm*60-hh*3600);
      if((k+1)!=secs) {
    document.getElementById('ss').innerHTML += hh.toFixed(0) +":"+mm.toFixed(0)+":"+ss.toFixed(0)+"<br>";
     k=secs;

     //f();
    // gg();
    secs++;
g=0;
if(n==1)
    return;
      }

}
  //document.getElementById('bi').innerHTML=k;


    d3.select('#ang').html(ra(m-h)+"<br>min:"+m+"<br>hr:"+h+"<br>sec:"+secs);
/*
    document.getElementById('hr').value=hours ;
    document.getElementById('mn').value=mins;
    document.getElementById('sc').value=secs;
    */

    hr1=document.getElementById('hr1').value;
    mn1=document.getElementById('mn1').value;
    sc1=document.getElementById('sc1').value;

      esamay=parseInt(hr1)*60*60+parseInt(mn1)*60+parseInt(sc1);

    if(secs>=parseInt(esamay)){
      f();
      return;
    }

//alert("hi");
    //requestAnimationFrame(framed)
if(n==1)
    if(g==0)
    return;
    secs++;

      setTimeout(framed,speed);
}

function ns()
{
  if(n==1)
  {
    n=0;
    document.getElementById('da').value='nonstop mode';

  }
  else{
    n=1;
    document.getElementById('da').value='break mode';
  }
  fram();
}
function f()
{
//  if(secs>0) framed();
  if(g==0)
  {
    speed=  document.getElementById('sup').value
    document.getElementById('bb').value='stop';
    g=1;
  framed();
}
  else {
    n=1;
      document.getElementById('bb').value='start';
    g=0;
    speed=document.getElementById('sup').value;
    hr=document.getElementById('hr').value;
    mn=document.getElementById('mn').value;
    sc=document.getElementById('sc').value;



    secs=parseInt(hr)*60*60+parseInt(mn)*60+parseInt(sc);
//    alert(secs)





  }
//alert(m-h);
}
//eq(2.02,2)
function eq(x,y)
{

  var spl = x.toString().split('.');
  if(!(spl[1]=== undefined))
      x=     spl[0]+'.'+spl[1].substr(0,2);

  if(parseInt(parseFloat(x).toFixed(1)*10)==y*10){
  //alert(x+"tt"+parseFloat(x).toFixed(1));
  return true;
}
  return false;

}
function ra(x)
{
  x=Math.abs(x);
if(parseInt(x)>=360)
{
  x=(Math.abs(x-360*parseInt(x/360))).toFixed(2);
  if(parseInt(x)>180)
  return Math.abs(360-x);
return x;
}
    if(parseInt(x)>180)
    return Math.abs((360-x)).toFixed(2);
    return x.toFixed(2);
}
function gg()
{
  if(g==1)
  g=0;
  else g=1;
}
