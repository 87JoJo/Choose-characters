  (() => {
      const title1 = document.querySelector('.title-1');
      const title2 = document.querySelector('.title-2');
      //   視窗高度
      const windowHeight = document.body.clientHeight;

      function title2Handler() {
          // 當前滾動位置離top高度
          const height = window.pageYOffset;
          //   元素離頂部距離
          const titleTop = title2.offsetTop;

          height >= (windowHeight - titleTop) ? title2.classList.add('show') : console.log(height);
      }

      function title1Handler() {
          title1.classList.add('show');
          console.log(true);

      }
      // 載入會觸發
      window.addEventListener('load', title1Handler)
      //   滾動、調整size會觸發
      window.addEventListener('scroll', title2Handler)
  })();