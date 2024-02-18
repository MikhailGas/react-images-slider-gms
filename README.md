# react-images-slider-gms

### Установка

` npm i react-images-slider-gms

### Исползование

```
return(
<Slider
        slides={slides}
        loop={true}
        navs={true}
        pags={true}
        auto={true}
        stopMouseHover={true}
        delay={3}
    />
)
```

- loop - возможность листать слайдер по кругу (например когда на 3 слайде нажимаем далее - переходим на   1). true или false
- navs - Вывод стрелочек или их отключение. true или false
- pags - вывод пагинации или отключение. true или false
- auto - слайдер сам переключается, если delay не указан, раз в 5 сек. А
- stopMouseHover - если навести мышкой на слайд, он не переключается, как только мышку убрали, снова пошло. Работает только когда auto равен true. true или false
- delay - время в секундах на показ слайда, если auto true
