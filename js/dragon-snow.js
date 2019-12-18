(function($){
  $(function(){


class Dragon_Snow {

  constructor(container,size_snow){
      this.container = container;
      this.size_snow = size_snow;
      this.name_id = 'chesnokit_snow';
      this.ind = 1;
      this.timer = '';
      
  }


  start_make_snow(){
      this.timer = setInterval(()=>{
          this.ind++;
          this.render_snow();
      },400)
  }

  stop_make_snow(){
      clearInterval(this.timer);
      
  }

  /**
* функция определяет координату по оси х появления снежинки
* за счет рандомного значения взятого из длины блока (в данном случае wrap)
*/
rnd_snow(){

  let width_container = $(this.container).width()-50;
 let x_position = this.getRandomInt(width_container); 
  return x_position;
}

getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
* добавляет элемент снежинка в блок wrap и задает свойства этому элементу
*/
render_snow(){

  let snow_element =$("<span>",{
      "class":"chesnokit_snow",
      "id":this.name_id+this.ind,
      html:"\&#10052;"
  }).css({
      'color':'white',
      'font-size':this.size_snow+'px',
      'position':'absolute',
      'z-index':1000,
      'top': -this.size_snow+'px',
      'left':this.rnd_snow() +'px'
  }).appendTo(this.container);
        
  
  /**
   * после прорисовки вызывается функция движения элемента
   */
  this.fly_snow($(snow_element).attr('id'));
}

/**
 * функция полета(движения) снежинки
 * @param {string} name 
 */
fly_snow(name){

  let y = $(this.container).height();
  
        $('#'+name).animate({
          'top':y-(this.size_snow+10),
          
          'opacity':0.05
          },30000, function(){
            $('#'+name).fadeOut(300).remove();
           })

}     


}


let dragon_snow = new Dragon_Snow($('.dragon_snow'),30);
dragon_snow.start_make_snow();


  });
})(jQuery);