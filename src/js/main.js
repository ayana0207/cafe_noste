"use strict";
/*---------- GSAP 設定 ----------*/
//存在しない要素を取得しようとするときに出るエラーを非表示にする
gsap.config({
  nullTargetWarn: false,
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！オープニングアニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const openingBody = document.querySelector(".js_opening-body");
const opening = document.querySelector(".js_opening");
const openingImg = document.querySelector(".js_opening-img");

function OpeningAnime() {
  // bodyタグの範囲に対して.is-activeをつけ外しする（ハンバーガーで指定したoverflow:hiddenが効く）
  openingBody.classList.toggle("is-active");
  gsap.set(opening, {
    // 最初は背景のみ
    autoAlpha: 1,
  });
  gsap.set(openingImg, {
    autoAlpha: 0,
    // scale: 1.2,
    y: 10,
  });
  gsap
    .timeline(function () {})
    .to(
      {},
      {
        duration: 1,
      }
    )
    .to(openingImg, {
      duration: 2,
      autoAlpha: 1,
      // scale: 1,
      y: 0,
    })
    .to(
      {},
      {
        duration: 1,
      }
    )
    .to([opening, openingImg], {
      duration: 1,
      autoAlpha: 0,
      //1秒の遅延
      // delay: 0,
      // onComplete:アニメーションが完了したら
      onComplete: () => {
        openingBody.classList.toggle("is-active");
      },
    })
    //スライドインのアニメーション
    .from(".js_copy", {
      duration: 2,
      autoAlpha: 0,
    });
}

// 2回目以降は繰り返さない
function webStorage() {
  if (sessionStorage.getItem("access")) {
    openingBody.classList.remove("is-active");
    gsap.set(opening, {
      autoAlpha: 0,
      display: "none",
    });
    gsap.set(openingImg, {
      autoAlpha: 0,
      display: "none",
    });
    // opening.classList.add("is-active");
  } else {
    sessionStorage.setItem("access", "0");
    OpeningAnime();
  }
}

webStorage();

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！リンク先スムーススクロール！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

// １番目
function scrollToHeading() {
  const link = document.querySelectorAll('a[href^="#"]');
  const linkPage = document.querySelectorAll(".js_link-page");

  link.forEach((a, index) => {
    a.addEventListener("click", (event) => {
      event.preventDefault();

      // getBoundingClientRect()のtopやyはビューポートの位置から取得しているため、相対的な数値になる
      const linkPagePostionY = linkPage[index].getBoundingClientRect().top;

      // topだったら、0のまま
      let linkPageScrollPositionY = 0;
      if (linkPage[index].id !== "top") {
        linkPageScrollPositionY = Math.floor(linkPagePostionY + window.scrollY);
      }

      window.scrollTo({
        behavior: "smooth",
        top: linkPageScrollPositionY,
        left: 0,
      });
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  scrollToHeading();
});

// ２番目
// function scrollToHeading() {
//   // 修正1: セレクタを a[href="#"] に
//   const links = document.querySelectorAll('a[href="#"]');
//   // 毎回探さずに一度だけ取得
//   const linkPages = document.querySelectorAll('.js_link-page');

//   links.forEach((a, index) => {
//     a.addEventListener('click', (event) => {
//       event.preventDefault();

//       const target = linkPages[index];
//       if (!target) return; // 対応する要素がなければ何もしない

//       // 固定ヘッダー分のオフセット（任意）
//       const header = document.querySelector('.l_header');
//       const offset = header ? header.offsetHeight : 0;

//       const linkPagePositionY = Math.floor(
//         target.getBoundingClientRect().top + window.scrollY - offset
//       );

//       // 修正2: top を指定（left は0のままでOK）
//       window.scrollTo({
//         top: linkPagePositionY,
//         left: 0,
//         behavior: 'smooth',
//       });
//     });
//   });
// }

// window.addEventListener('DOMContentLoaded', () => {
//   scrollToHeading();
// });

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！TOP KV スライドアニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const slideshow = new Swiper(".js_slideshow", {
  loop: true,
  // 切り替え時のスピード4s
  speed: 4000,
  // フェードエフェクト
  effect: "fade",
  autoplay: {
    // スライドが5s毎に自動切り替え
    delay: 5000,
    disableOnInteraction: false,
  },
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！ハンバーガーメニューがクリックされた時の動作！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const hamburger = document.querySelector(".js_hamburger");
const nav = document.querySelector(".js_nav");
const body = document.querySelector(".js_body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  nav.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！ナビが作動しページ内リンクに移動する時に作動！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
const navLink = document.querySelectorAll(".l_header-nav_link");

navLink.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    nav.classList.remove("is-active");
    body.classList.remove("is-active");
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！画像ふわっとアニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
window.addEventListener("scroll", () => {
  // スクロールの量を取得
  const scroll = window.scrollY;
  // 画面の高さを取得
  const windowHeight = window.innerHeight;
  // 全ての「.js_imgfadein」を取得
  const fadeIn = document.querySelectorAll(".js_img-fadein");

  fadeIn.forEach(function (fadeIn) {
    // 「.js_imgfadein」までの高さを取得
    const imgTop = fadeIn.getBoundingClientRect().top + scroll;
    const imgBottom = imgTop + fadeIn.offsetHeight;

    // 画面の中心Y座標（スクロール位置 + 画面高さの半分）
    // const centerY = scroll + windowHeight / 2;

    if (scroll + windowHeight > imgTop && scroll < imgBottom) {
      // if (centerY > imgTop && centerY < imgBottom) {
      fadeIn.classList.add("is-active");
    } else {
      fadeIn.classList.remove("is-active");
    }
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！画像 スクロールすると上下するパララックスアニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function parallax() {
  "use strict";
  // 「見せ窓（枠）」となる要素のセレクタ文字列を保存
  const targetClass = ".js-parallax-elm-box";
  // 「実際に動かす中身」のセレクタ文字列を保存
  const childClass = ".js-parallax-elm";
  // document.querySelectorAll で枠要素を全部取得（NodeList）し、Array#slice を使って配列に変換して targets に
  const targets = Array.prototype.slice.call(
    document.querySelectorAll(targetClass),
    0
  );
  // 対象が1つもなければ処理をやめる
  if (targets.length === 0) return false;

  // 現在のビューポート高さを取得して winH に入れる
  let winH = window.innerHeight;

  // 後で定義する parallaxFunk をまず1回実行（初期位置の反映）
  parallaxFunk();
  // ウィンドウがリサイズされたら、最新の高さ winH を再取得し、requestAnimationFrame で描画タイミングに合わせて処理を実行（無駄な連打を抑える）
  window.addEventListener("resize", function () {
    winH = window.innerHeight;
    requestAnimationFrame(parallaxFunk);
  });
  // スクロール時も requestAnimationFrame で1フレーム内に集約して処理（高頻度スクロールでも負荷を軽減）
  window.addEventListener("scroll", function () {
    requestAnimationFrame(parallaxFunk);
  });

  // パララックスの本体処理（毎回呼ばれる関数）の定義
  function parallaxFunk() {
    // **ページ上端のスクロール量（px）**を取得。pageYOffset がなければ代替で documentElement.scrollTop
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // **ページ下端位置（上端 + 画面高）**を計算（ビューポートの下端のY座標）
    const scrollBottom = scrollTop + winH;

    // すべての「枠」要素について順番に処理
    targets.forEach(function (target) {
      // 枠のページ基準での上端位置を計算。getBoundingClientRect().top（画面基準）＋ scrollTop（スクロール量）＝ページ全体での位置
      const targetPosi = target.getBoundingClientRect().top + scrollTop;
      // 枠の高さ（ボーダー除く内側サイズ）を取得
      const targetHeight = target.clientHeight;
      // 枠の上端が画面下端に触れる時点のスクロール量を算出（＝「入り始め」判定の下限）
      const targetShowPosi = targetPosi - winH;
      // 枠の下端のページ位置（＝「抜け切る」位置）を算出
      const targetEndPosi = targetPosi + targetHeight;

      // いまのスクロール位置が「枠の可視範囲にかかっている」間だけ、パララックス計算を実行。（＝画面に入っている間だけ動かす）
      if (scrollTop > targetShowPosi && scrollTop < targetEndPosi) {
        // 枠の中から動かす中身（.js-parallax-elm）を取得
        const child = target.querySelector(childClass);
        // 中身が無ければこの枠の処理はスキップ
        if (!child) return false;

        // 中身の高さを取得
        const childHeight = child.clientHeight;
        // 最大移動量を計算。枠より中身が大きいぶんだけ上下に動かせる、という考え方
        const maxVal = childHeight - targetHeight;
        // スクロール位置に応じた現在の移動量を算出。
        // scrollBottom - targetPosi … 画面下端が枠上端からどれくらい進んだか
        // maxVal / (winH + targetHeight) … その進捗に対する移動の比率
        // toFixed(1) … 少数1桁に丸めて過度な再描画を防ぐ（小さな最適化）
        const setVal = (
          (scrollBottom - targetPosi) *
          (maxVal / (winH + targetHeight))
        ).toFixed(1);
        // 中身を 上方向（マイナスY）にsetValpx 移動。translate3d を使ってGPU合成で描画し、滑らかさを確保
        child.style.transform = "translate3d(0," + -setVal + "px,0)";
      }
    });
  }
}
// DOMが組み上がった直後に parallax() を呼ぶ（対象の要素が確実に存在する状態で初期化）
document.addEventListener("DOMContentLoaded", () => {
  parallax();
});
// すべての画像の読み込みが完了したら、擬似的に scroll イベントを1回発火して再計算を促す（画像で高さが変わる問題を解消）
window.addEventListener("load", () => {
  window.dispatchEvent(new Event("scroll"));
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！セクションがページのように重なって表示されるスクロールアニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
scrollOverlap();
function scrollOverlap() {
  const targets = document.querySelectorAll(".js-scroll-overlap");
  if (targets.length === 0) {
    return;
  }

  let lastWinHight = window.innerHeight;

  //position: sticky;のオフセット値をCSS変数で設定
  const setStickyOffset = () => {
    targets.forEach((target) => {
      const targetHeight = target.offsetHeight;
      //ウィンドウの高さが要素の高さより大きい場合はオフセット値を-1pxに設定
      const offsetValue =
        lastWinHight > targetHeight
          ? "-1px"
          : `-${targetHeight - lastWinHight}px`;
      target.style.setProperty("--sticky-offset", offsetValue);
      // 画面高 - 要素高（短い時は正、長い時は負）をそのまま top に使う
      const gap = lastWinHight - targetHeight; // 例: 800-300=+500px → 下端一致で固定
      target.style.setProperty("--sticky-offset", `${gap}px`);
    });
  };
  setStickyOffset();

  addEventListener("resize", () => {
    //ウィンドウの高さが変わった時のみウィンドウの高さを更新
    const winHight = window.innerHeight;
    if (lastWinHight !== winHight) {
      lastWinHight = winHight;
    }
  });

  // bodyのサイズ変更を監視して再取得
  const body = document.body;
  // ResizeObserverを作成
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      setStickyOffset();
    }
  });
  // body要素を監視対象に追加
  resizeObserver.observe(body);

  /*
    キーボード操作時に無効化するクラスを付与する
    フォーカス移動時にフォーカスした要素と、次のエリアが重なって要素が見えなくなってしまう可能性への対応
  */
  const toggleDisabledClass = (boolean) => {
    targets.forEach((target) => {
      target.classList.toggle("is-disabled", boolean);
    });
  };

  //キーボードフォーカス状態を管理するフラグ
  let isKeyboardFocus = false;

  //キーボードのフォーカス移動時には無効化する
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      //Tabキーが押されたのでキーボード操作中
      isKeyboardFocus = true;
      toggleDisabledClass(isKeyboardFocus);
    }
  });

  //マウス操作の検知で無効化を解除する
  document.addEventListener("mousedown", () => {
    if (isKeyboardFocus) {
      //マウス操作があったのでキーボードフォーカスを解除
      isKeyboardFocus = false;
      toggleDisabledClass(isKeyboardFocus);
    }
  });
}

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！こだわりセクション赤線出現アニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// それぞれの .m_menu-group ごとに発火
gsap.utils.toArray(".top_commitment-txt_box").forEach((group) => {
  ScrollTrigger.create({
    trigger: group,
    start: "top center",
    onEnter: () => group.classList.add("is-active"),
    onLeaveBack: () => group.classList.remove("is-active"),
    // 一度きりでOKならこちらを有効化
    // once: true,
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！各メニューセクションの出現アニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// .js_slide-trigger を 配列化して取得し各要素を section として 順番に処理。
// ここでセクションごとの発火を作る。
gsap.utils.toArray(".js_slide-trigger").forEach((section) => {
  // いま処理中の section の中だけを検索して、アニメ対象の .js_slide をまとめて取得
  const slides = section.querySelectorAll(".js_slide");

  // 取得した「slides」に対してgsapfromを開始する
  gsap.from(slides, {
    y: -30,
    autoAlpha: 0,
    duration: 1.5,
    ease: "Power4.inOut",
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      // markers: true,
    },
    stagger: {
      // each: 指定した時間が経過された時に次の要素のアニメーションを開始する
      each: 0.2,
      // amount: アニメーションの総時間（eachかamountのどちらかを指定する）
      // amount: 1,
      from: "start",
      // 順番に表示する際のアニメーションスピード
      // ease: "bounce"
    },
  });
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ！！各メニューセクションのライン出現アニメーション！！ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// それぞれの .m_menu-group ごとに発火
gsap.utils.toArray(".m_menu-group").forEach((group) => {
  ScrollTrigger.create({
    trigger: group,
    start: "top center",
    onEnter: () => group.classList.add("is-active"),
    onLeaveBack: () => group.classList.remove("is-active"),
    // 一度きりでOKならこちらを有効化
    // once: true,
  });
});
