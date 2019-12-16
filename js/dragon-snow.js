(function($){
    $(function(){

/**
 * фабрика запускает снежинки каждые 400 мс
 * name & ind используется для определения каждой снежинки
 */
class Dragon_Snow {
    constructor(){
        this.name = 'snow';
        this.ind = 1;
        let timer = setInterval(()=>{
            this.ind++;
            this.render_snow();
        },400)
    }


/**
 * функция определяет координату по оси х появления снежинки
 * за счет рандомного значения взятого из длины блока (в данном случае wrap)
 */
    rnd_snow(){
        let w_snow = $('.dragon_snow').width()-50;
       let x1 = this.getRandomInt(w_snow); 
        return x1;
      }
    
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

/**
 * добавляет элемент снежинка в блок wrap и задает свойства этому элементу
 */
    render_snow(){
          
        $('.dragon_snow').append('<span class="rr" id="'+this.name+this.ind+'">&#10052;</span>');
        $('#'+this.name+this.ind).css({
            'color':'white',
            'font-size':'30px',
            'position':'absolute',
            'top': '-30px',
            'left':this.rnd_snow() +'px'
        })
        /**
         * после прорисовки вызывается функция движения элемента
         */
        this.fly_snow(this.name+this.ind);
  }

  /**
   * функция полета(движения) снежинки
   * @param {string} name 
   */
  fly_snow(name){

    let y = $('.dragon_snow').height();
    /**
     * step_move шаг движения элемента вниз
     */
    let step_move = 5;

    /**
     * step_visible шаг уменьшения видимости элемента (эффект таяния -исчезновение)
     * длина пути делится на шаг полета,100/ на это значение = количество отрезков
     * и далее вычисляется шаг понижения видимости 
     */
    let step_visible = (1/100)*(100/(y/step_move));

    /**
     * flag_move флаг для опрделения пути движения, чтобы остановить элемент и удалить его
     */
      let flag_move = 0;
        
      /**
       * пока элемент не долетел до низа окна браузера минус 50px, он двигается с шагом step_move , после прохождения
       * этой точки он исчезает и удаяется
       */
       if(flag_move < y-50){ 

          flag_move+=step_move;
     
          /**
           * движение за счет функции анимации: задается конечная точка y-40px(40px от конечной точки вверх чтобы не
           * увеличивать окно браузера когда элемент дойдет вниз, у него же есть и свой размер)
           * прозрачность можно задать ранее вычисленным шагом step_visible, или же просто указать конечную прозрачность
           * разные эффекты: таким образом элемент исчезает в пути, в другом случае долетает до низа и там исчезает
           */
          $('#'+name).animate({
            'top':y-40,
            
            'opacity':step_visible
            },30000, function(){
              $('#'+name).fadeOut(300).remove();
             })

        }else{

          $('#'+name).fadeOut().remove();
         
        }    

  }     


}

   new Dragon_Snow();





    });
})(jQuery);