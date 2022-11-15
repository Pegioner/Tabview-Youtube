-(function() {
  'use strict';

  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  if (inIframe()) return;

  if (!$) return;

  /**
   * SVG resources:
   * <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
   */

  const scriptVersionForExternal = '2022/05/07';

  const isMyScriptInChromeRuntime = () => typeof GM === 'undefined' && typeof((((window || 0).chrome || 0).runtime || 0).getURL) == 'function'

  const svgComments = `<path d="M40.068 13.465l-34.138.07A5.94 5.94 0 0 0 0 19.465v21.141a5.94 5.94 0 0 0 5.93 5.929H12v10a1 
  1 0 0 0 1.74.673l9.704-10.675 16.626-.068A5.94 5.94 0 0 0 46 40.536V19.395a5.94 5.94 0 0 0-5.932-5.93zM10 23.465h13a1 
  1 0 1 1 0 2H10a1 1 0 1 1 0-2zm26 14H10a1 1 0 1 1 0-2h26a1 1 0 1 1 0 2zm0-6H10a1 1 0 1 1 0-2h26a1 1 0 1 1 0 
  2zm18.072-28.93l-34.142-.07A5.94 5.94 0 0 0 14 8.395v3.124l26.064-.054c4.377 0 7.936 3.557 7.936 7.93v21.07.071 
  2.087l3.26 3.586a1 1 0 0 0 1.74-.673v-10h1.07A5.94 5.94 0 0 0 60 29.607V8.465a5.94 5.94 0 0 0-5.928-5.93z"/>`.trim();

  const svgVideos = `<path d="M298 33c0-13.255-10.745-24-24-24H24C10.745 9 0 19.745 0 33v232c0 13.255 10.745 24 24 
  24h250c13.255 0 24-10.745 24-24V33zM91 39h43v34H91V39zM61 259H30v-34h31v34zm0-186H30V39h31v34zm73 
  186H91v-34h43v34zm-11-82.292v-55.417c0-8.25 5.868-11.302 12.77-6.783l40.237 26.272c6.902 4.519 6.958 11.914.056 
  16.434l-40.321 26.277c-6.902 4.52-12.742 1.467-12.742-6.783zM207 259h-43v-34h43v34zm0-186h-43V39h43v34zm61 
  186h-31v-34h31v34zm0-186h-31V39h31v34z"/>`.trim();

  const svgInfo = `<path d="M11.812 0C5.289 0 0 5.289 0 11.812s5.289 11.813 11.812 11.813 11.813-5.29 11.813-11.813S18.335 
  0 11.812 0zm2.459 18.307c-.608.24-1.092.422-1.455.548s-.783.189-1.262.189c-.736 
  0-1.309-.18-1.717-.539s-.611-.814-.611-1.367c0-.215.015-.435.045-.659a8.23 8.23 0 0 1 
  .147-.759l.761-2.688c.067-.258.125-.503.171-.731a3.24 3.24 0 0 0 
  .068-.633c0-.342-.071-.582-.212-.717s-.412-.201-.813-.201c-.196 
  0-.398.029-.605.09s-.383.12-.529.176l.201-.828c.498-.203.975-.377 1.43-.521s.885-.218 1.29-.218c.731 0 1.295.178 
  1.692.53s.594.812.594 1.376c0 .117-.014.323-.041.617a4.13 4.13 0 0 1-.152.811l-.757 
  2.68c-.062.215-.117.461-.167.736s-.073.485-.073.626c0 .356.079.599.239.728s.435.194.827.194a2.4 2.4 0 0 0 .626-.097 
  3.56 3.56 0 0 0 .506-.17l-.203.827zm-.134-10.878c-.353.328-.778.492-1.275.492s-.924-.164-1.28-.492a1.57 1.57 0 
  0 1-.533-1.193c0-.465.18-.865.533-1.196a1.81 1.81 0 0 1 1.28-.497 1.79 1.79 0 0 1 1.275.497c.353.331.53.731.53 
  1.196s-.177.865-.53 1.193z"/>`.trim();

  const svgPlayList = `<path d="M0 64h256v42.667H0zm0 85.333h256V192H0zm0 85.334h170.667v42.667H0zm341.333 
  0v-85.334h-42.666v85.334h-85.334v42.666h85.334v85.334h42.666v-85.334h85.334v-42.666z"/>`.trim();


  const DEBUG_LOG = false

  const LAYOUT_VAILD = 1;

  const LAYOUT_TWO_COLUMNS = 2;
  const LAYOUT_THEATER = 4;
  const LAYOUT_FULLSCREEN = 8;
  const LAYOUT_CHATROOM = 16;
  const LAYOUT_CHATROOM_COLLAPSED = 32;
  const LAYOUT_TAB_EXPANDED = 64;
  const LAYOUT_ENGAGEMENT_PANEL_EXPAND = 128;
  const LAYOUT_CHATROOM_EXPANDED = 256;

 
  let pageType = null;
  
  //let toggleBtnDC = null; //DOM or number
  
  let chatroomDetails = null;


  /*

  yt-action yt-add-element-to-app yt-autonav-pause-blur yt-autonav-pause-focus
yt-autonav-pause-guide-closed yt-autonav-pause-guide-opened yt-autonav-pause-player
yt-autonav-pause-player-ended yt-autonav-pause-scroll yt-autoplay-on-changed
yt-close-tou-form yt-consent-bump-display-changed yt-focus-searchbox
yt-get-context-provider yt-guide-close yt-guide-hover yt-guide-toggle
yt-history-load yt-history-pop yt-load-invalidation-continuation
yt-load-next-continuation yt-load-reload-continuation yt-load-tou-form
yt-masthead-height-changed yt-navigate yt-navigate-cache yt-navigate-error
yt-navigate-finish yt-navigate-redirect yt-navigate-set-page-offset
yt-navigate-start yt-next-continuation-data-updated yt-open-hotkey-dialog
yt-open-tou-form-loading-state yt-page-data-fetched yt-page-data-updated
yt-page-data-will-update yt-page-manager-navigate-start yt-page-navigate-start
yt-page-type-changed yt-player-attached yt-player-detached yt-player-released
yt-player-requested yt-player-updated yt-popup-canceled yt-popup-closed
yt-popup-opened yt-preconnect-urls yt-register-action yt-report-form-closed
yt-report-form-opened yt-request-panel-mode-change yt-retrieve-location
yt-service-request-completed yt-service-request-error yt-service-request-sent
yt-set-theater-mode-enabled yt-show-survey yt-subscription-changed
yt-swatch-changed yt-theater-mode-allowed yt-unregister-action yt-update-title
yt-update-unseen-notification-count yt-viewport-scanned yt-visibility-refresh

*/



  const nullFunc = function(){}
  const _console = new Proxy(console, {
    get(target, prop, receiver){
      if(!DEBUG_LOG && prop==='log'){
        return nullFunc
      }
      return Reflect.get(...arguments)
    }
  });

  const isPassiveArgSupport = (typeof IntersectionObserver==='function');
  // https://caniuse.com/?search=observer
  // https://caniuse.com/?search=addEventListener%20passive

  const bubblePassive = isPassiveArgSupport?{capture:false, passive:true}:false;
  const capturePassive = isPassiveArgSupport?{capture:true, passive:true}:true;


  
  _console.log(38489)


  const querySelectorFromAnchor = HTMLElement.prototype.querySelector; // nodeType==1 // since 2022/07/12
  const querySelectorAllFromAnchor = HTMLElement.prototype.querySelectorAll; // nodeType==1 // since 2022/07/12
  const closestDOM = HTMLElement.prototype.closest;
  const elementRemove = HTMLElement.prototype.remove;
  const elementInsertBefore = HTMLElement.prototype.insertBefore; // since 2022/07/12
  const elementContains = HTMLElement.prototype.contains; // since 2022/07/12

  const querySelectorFromAnchorFizzy = (root, id, selector)=>{
    if(!root) return null;
    if(root.id===id && root.matches(selector))return root;
    return querySelectorFromAnchor.call(root, selector) || null;
  }


  function maxUInt(s, d){
    let t = (d>s?d:s);
    return t>0?t:0;
  }

  function scriptInjector(script_id, url_chrome, response_id){

    let res={
      script_id: script_id,
      inject: function(){

        let res = this, script_id = this.script_id;

        if(!document.querySelector(`script#${script_id}`)){
          if (res.runtime_url){
            addScriptByURL(res.runtime_url).id = script_id;
          } else {
            addScript(`${res.injection_script}`).id = script_id;
          }
        }

      }
    }
    res.script_id = script_id;
    
    if (isMyScriptInChromeRuntime()){
      res.runtime_url = window.chrome.runtime.getURL(url_chrome)
    } else {
      res.injection_script = GM_getResourceText(response_id);
    }

    return res;



  }

  /*
  const script_inject_facp = scriptInjector(
    'userscript-tabview-injection-facp',
    'js/injectionScript_fixAutoComplete.js',
    "injectionFixAutoComplete");
    */

  const script_inject_js1 = scriptInjector(
    'userscript-tabview-injection-1',
    'js/injection_script_1.js',
    "injectionJS1");
    
   

  
  /** @type {(o: Object | null) => WeakRef | null} */
  const mWeakRef = typeof WeakRef === 'function' ? (o => o ? new WeakRef(o) : null) : (o => o || null); // typeof InvalidVar == 'undefined'

  /** @type {(wr: Object | null) => Object | null} */
  const kRef = (wr => (wr && wr.deref) ? wr.deref() : wr);



  const nonCryptoRandStr_base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  function nonCryptoRandStr(/** @type {number} */ n){
    const result = new Array(n);
    const baseStr = nonCryptoRandStr_base;
    const bLen = baseStr.length;
    for ( let i = 0; i < n; i++ ) {
      let t = null
      do {
        t = baseStr.charAt(Math.floor(Math.random() * bLen));
      }while(i===0 && 10-t>0)
      result[i]=t;
   }
   return result.join('');
  }

/**
 * Class definition
 * @property {string} propName - propriety description
 * ...
 */
  class ObserverRegister{
    
    constructor(/** @type {()=>MutationObserver | IntersectionObserver} */ observerCreator){
      let uid = null;
      const uidStore = ObserverRegister.uidStore;
      do{
        uid = nonCryptoRandStr(5);
      }while(uidStore[uid])
      uidStore[uid] = true;
      
      /**
       * uid is the unique string for each observer
       * @type {string}
       * @public
       */
      this.uid = uid;
      
      /**
       * observerCreator is a function to create the observer
       * @type {Function}
       * @public
       */
      this.observerCreator = observerCreator
      
      /**
       * observer is the actual observer object
       * @type {MutationObserver | IntersectionObserver}
       * @public
       */
      this.observer = null;
    }
    bindElement(/** @type {HTMLElement} */ elm, ...args){
      if(elm.hasAttribute(`o3r-${this.uid}`))return false;
      elm.setAttribute(`o3r-${this.uid}`,'')
      if(this.observer===null){
        this.observer=this.observerCreator();
      }
      this.observer.observe(elm, ...args)
      return true
    }
    clear(/** @type {boolean} */ flag){
      if(this.observer !== null){
        //const uidStore = ObserverRegister.uidStore;
        if(flag === true){
          this.observer.takeRecords();
          this.observer.disconnect();
        }
        this.observer = null;
        for(const s of document.querySelectorAll(`[o3r-${this.uid}]`)) s.removeAttribute(`o3r-${this.uid}`)
        //uidStore[this.uid]=false;
        //this.uid = null;
      }
    }
  }

  /**
 * 'uidStore' is the static store of strings used.
 * @static
 */
  ObserverRegister.uidStore = {}; //backward compatible with FireFox 55.


  const mtoMutation_body = new ObserverRegister(()=>{
    return new MutationObserver(FP.mtoBodyF)
  }); 

  const mtoFlexyAttr = new ObserverRegister(()=>{
    return new MutationObserver(mtf_attrFlexy)
  }); 

  const mtoVisibility_EngagementPanel = new ObserverRegister(()=>{
    return new MutationObserver(FP.mtf_attrEngagementPanel)
  });
  const sa_epanel = mtoVisibility_EngagementPanel.uid;

  const mtoVisibility_Playlist = new ObserverRegister(()=>{
    return new AttributeMutationObserver({
      "hidden": FP.mtf_attrPlaylist
    })
  })
  const sa_playlist = mtoVisibility_Playlist.uid;

  const mtoVisibility_Comments = new ObserverRegister(()=>{
    return new AttributeMutationObserver({
      "hidden": FP.mtf_attrComments
    })
  })
  const sa_comments = mtoVisibility_Comments.uid;


  const mtoVisibility_Chatroom = new ObserverRegister(()=>{
    return new AttributeMutationObserver({
      "collapsed": FP.mtf_attrChatroom
    })
  })
  const sa_chatroom = mtoVisibility_Chatroom.uid;





  class ScriptEF {
    constructor() {
      this._id = scriptEC;
    }
    isValid() {
      return this._id === scriptEC;
    }
  }

  class Timeout {

    set(f, d, repeatCount) {
      if (this.cid > 0) return;
      let sEF = new ScriptEF();
      if (repeatCount > 0) {

        let rc = repeatCount;
        const g = () => {
          this.cid = 0;
          if (!sEF.isValid()) return;
          let res = f();
          if (--rc <= 0) return;
          if (res === true) this.cid = timeline.setTimeout(g, d);
        }
        g();

      } else {

        const g = () => {
          this.cid = 0;
          if (!sEF.isValid()) return;
          if (f() === true) this.cid = timeline.setTimeout(g, d);
        }
        this.cid = timeline.setTimeout(g, d);
      }
    }

    clear() {
      if (this.cid > 0) timeline.clearTimeout(this.cid);
    }

    isEmpty() {
      return !this.cid
    }


  }

  class Mutex {

    constructor() {
      this.p = Promise.resolve()
    }

    lockWith(f) {

      this.p = this.p.then(() => {
        return new Promise(f)
      }).catch(console.warn)
    }

  }



  function prettyElm(/** @type {Element} */ elm) {
    if (!elm || !elm.nodeName) return null;
    const eId = elm.id || null;
    const eClsName = elm.className || null;
    return [elm.nodeName.toLowerCase(), typeof eId == 'string' ? "#" + eId : '', typeof eClsName == 'string' ? '.' + eClsName.replace(/\s+/g, '.') : ''].join('').trim();
  }

  function extractTextContent(/** @type {Node} */ elm) {
    return elm.textContent.replace(/\s+/g, '').replace(/[^\da-zA-Z\u4E00-\u9FFF\u00C0-\u00FF\u00C0-\u02AF\u1E00-\u1EFF\u0590-\u05FF\u0400-\u052F\u0E00-\u0E7F\u0600-\u06FF\u0750-\u077F\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF\u3040-\u30FF\u31F0-\u31FF]/g, '')
  }

  function addScript(/** @type {string} */ scriptText) {
    const scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.textContent = scriptText;
    try {
      document.documentElement.appendChild(scriptNode);
    } catch (e) {
      console.log('addScript Error', e)
    }
    return scriptNode;
  }

  function addScriptByURL(/** @type {string} */ scriptURL) {
    const scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.src = scriptURL;
    try {
      document.documentElement.appendChild(scriptNode);
    } catch (e) {
      console.log('addScriptByURL Error', e)
    }
    return scriptNode;
  }

  function addStyle(/** @type {string} */ styleText, /** @type {HTMLElement | Document} */ container) {
    const styleNode = document.createElement('style');
    //styleNode.type = 'text/css';
    styleNode.textContent = styleText;
    (container || document.documentElement).appendChild(styleNode);
    return styleNode;
  }


  const stopIframePropagation = function(/** @type {Event} */ evt){
    if(scriptEnable && ((evt||0).target||0).nodeName === 'IFRAME'){
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    }
  }
  document.addEventListener('mouseover', stopIframePropagation, true)
  document.addEventListener('mouseout', stopIframePropagation, true)
  document.addEventListener('mousedown', stopIframePropagation, true)
  document.addEventListener('mouseup', stopIframePropagation, true)
  document.addEventListener('keydown', stopIframePropagation, true)
  document.addEventListener('keyup', stopIframePropagation, true)
  document.addEventListener('mouseenter', stopIframePropagation, true)
  document.addEventListener('mouseleave', stopIframePropagation, true)



  function isDOMVisible(/** @type {HTMLElement} */ elem) {
    // jQuery version : https://github.com/jquery/jquery/blob/a684e6ba836f7c553968d7d026ed7941e1a612d8/src/css/hiddenVisibleSelectors.js
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  }

  function isNonEmptyString(s) {
    return typeof s == 'string' && s.length > 0;
  }


  async function nativeCall(/** @type {EventTarget} */ dom, /** @type {any[]} */ detail) {
    //console.log(1231)
    dom.dispatchEvent(new CustomEvent("userscript-call-dom", { detail: detail }))
    //console.log(1232)
  }

  async function nativeFunc(/** @type {EventTarget} */ dom, /** @type {string} */ property, /** @type {any} */ args) {
    dom.dispatchEvent(new CustomEvent("userscript-call-dom-func", { detail: { property, args } }))
  }

  // async function nativeValue(dom, property, args) {
  //   dom.dispatchEvent(new CustomEvent("userscript-call-dom-value", { detail: { property, args } }))
  // }
  // async function nativeFuncStacked(/** @type {string} */ selector, /** @type {string} */ property, /** @type {any} */ args){
  //   document.dispatchEvent(new CustomEvent("userscript-call-dom-func-stacked", { detail: { selector, property, args } }))
  // }
  // async function nativeValueStacked(selector, property, args){
  //   document.dispatchEvent(new CustomEvent("userscript-call-dom-value-stacked", { detail: { selector, property, args } }))
  // }
  // async function nativeConstStacked(selector, property, args){
  //   document.dispatchEvent(new CustomEvent("userscript-call-dom-const-stacked", { detail: { selector, property, args } }))
  // }

  function isCommentsK(ytdFlexyElm){
    
    return (ytdFlexyElm.getAttribute('tabview-youtube-comments')||'').indexOf('K')>=0

  }

  function akAttr(/** @type {HTMLElement} */ cssElm, /** @type {String} */ attrName, /** @type {boolean} */ isNegative, /** @type {string | any} */ flag) {
    // isNegative => incomplete loading

    let u = parseInt(cssElm.getAttribute(attrName) || 0) || 0;
    let ak = Math.abs(u);

    if (ak > 100 && isNegative && u < 0) {

    } else if (ak > 100 && !isNegative && u > 0) {

    } else {
      if (ak <= 100) {
        ak = 101;
      } else {
        ak++;
        if (ak >= 800) ak = 101;
      }
      // 101, 102, ... 799, 101 
    }

    cssElm.setAttribute(attrName, `${ isNegative ? -ak : ak }${ flag || '' }`)
  }



  let timeout_resize_for_layout_change = new Timeout();

  function dispatchWindowResize(){
    // for youtube to detect layout resize for adjusting Player tools
    return window.dispatchEvent(new Event('resize'));
  }

  
  function setToggleBtnTxt(){
          
    if(chatroomDetails){
      _console.log(124234,'c=== ')

      let chat = document.querySelector('ytd-live-chat-frame#chat');
      if(!chat) return;
      let txt = querySelectorFromAnchor.call(chat, 'span.yt-core-attributed-string[role="text"]');
      let c = txt.textContent;
      
      if(typeof c ==='string' && c.length>2){

        if(chat.hasAttribute('collapsed')){
          _console.log(124234,'collapsed show expand ',chatroomDetails.txt_expand)
          if(c!==chatroomDetails.txt_expand)
          txt.textContent= chatroomDetails.txt_expand
        }else{
          
        _console.log(124234,'not collapsed show collapse ',chatroomDetails.txt_collapse)
        if(c!==chatroomDetails.txt_collapse)
          txt.textContent= chatroomDetails.txt_collapse
           }
      }
    }
  }



  function layoutStatusChanged(/** @type {number} */ old_layoutStatus, /** @type {number} */ new_layoutStatus) {


    if (old_layoutStatus === new_layoutStatus) return;

    const cssElm = kRef(ytdFlexy);

    if (!cssElm) return;

    const BF_TWOCOL_N_THEATER = LAYOUT_TWO_COLUMNS|LAYOUT_THEATER

    let new_isExpandedChat = !!(new_layoutStatus & LAYOUT_CHATROOM_EXPANDED)
    let new_isCollapsedChat = !!(new_layoutStatus & LAYOUT_CHATROOM_COLLAPSED) && !!(new_layoutStatus & LAYOUT_CHATROOM)

    let new_isTabExpanded = !!(new_layoutStatus & LAYOUT_TAB_EXPANDED);
    let new_isFullScreen = !!(new_layoutStatus & LAYOUT_FULLSCREEN);
    let new_isExpandEPanel = !!(new_layoutStatus & LAYOUT_ENGAGEMENT_PANEL_EXPAND);

    


    function showTabOrChat() {

      layoutStatusMutex.lockWith(unlock => {

        if (lstTab.lastPanel == '#chatroom') {

          if (new_isTabExpanded) switchTabActivity(null)
          if (!new_isExpandedChat) ytBtnExpandChat();

        } else if (lstTab.lastPanel && lstTab.lastPanel.indexOf('#engagement-panel-') == 0) {

          if (new_isTabExpanded) switchTabActivity(null)
          if (!new_isExpandEPanel) ytBtnOpenEngagementPanel(lstTab.lastPanel);

        } else {

          if (new_isExpandedChat) ytBtnCollapseChat()
          if (!new_isTabExpanded) {setToActiveTab();}

        }

        timeline.setTimeout(unlock, 40);

      })
    }

    function hideTabAndChat() {

      layoutStatusMutex.lockWith(unlock => {

        if (new_isTabExpanded) switchTabActivity(null)
        if (new_isExpandedChat) ytBtnCollapseChat()
        if (new_isExpandEPanel) ytBtnCloseEngagementPanels();


        timeline.setTimeout(unlock, 40);

      })

    }

    const statusCollapsedFalse = !!(new_layoutStatus & (LAYOUT_TAB_EXPANDED|LAYOUT_ENGAGEMENT_PANEL_EXPAND|LAYOUT_CHATROOM_EXPANDED))
    const statusCollapsedTrue = !statusCollapsedFalse
    

    let changes = (old_layoutStatus & LAYOUT_VAILD) ? old_layoutStatus ^ new_layoutStatus : 0;

    let chat_collapsed_changed = !!(changes & LAYOUT_CHATROOM_COLLAPSED)
    let chat_expanded_changed = !!(changes & LAYOUT_CHATROOM_EXPANDED)
    let tab_expanded_changed = !!(changes & LAYOUT_TAB_EXPANDED)
    let theater_mode_changed = !!(changes & LAYOUT_THEATER)
    let column_mode_changed = !!(changes & LAYOUT_TWO_COLUMNS)
    let fullscreen_mode_changed = !!(changes & LAYOUT_FULLSCREEN)
    let epanel_expanded_changed = !!(changes & LAYOUT_ENGAGEMENT_PANEL_EXPAND)
 

    //console.log(169, 1, chat_collapsed_changed, tab_expanded_changed)
    //console.log(169, 2, new_isExpandedChat, new_isCollapsedChat, new_isTabExpanded)
    
    let BF_LayoutCh_Panel = (changes & (LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM_EXPANDED|LAYOUT_ENGAGEMENT_PANEL_EXPAND))
    let tab_change = BF_LayoutCh_Panel;
    let isChatOrTabExpandTriggering = !!((new_layoutStatus) & BF_LayoutCh_Panel);
    let isChatOrTabCollaspeTriggering = !!((~new_layoutStatus) & BF_LayoutCh_Panel);



    let moreThanOneShown = (new_isTabExpanded + new_isExpandedChat + new_isExpandEPanel) > 1

    let requestVideoResize = false;

    // two column; not theater; tab collapse; chat expand; ep expand
    const IF_01a = LAYOUT_TWO_COLUMNS|LAYOUT_THEATER|LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM|LAYOUT_CHATROOM_COLLAPSED|LAYOUT_ENGAGEMENT_PANEL_EXPAND;
    const IF_01b = LAYOUT_TWO_COLUMNS|0|0|LAYOUT_CHATROOM|0|LAYOUT_ENGAGEMENT_PANEL_EXPAND;

    
    // two column; not theater;
    const IF_02a = BF_TWOCOL_N_THEATER;
    const IF_02b = LAYOUT_TWO_COLUMNS;

    // two column; not theater; tab expand; chat expand; 
    const IF_03a = LAYOUT_TWO_COLUMNS|LAYOUT_THEATER|LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM|LAYOUT_CHATROOM_COLLAPSED;
    const IF_03b = LAYOUT_TWO_COLUMNS|0|LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM|0;

    
    // two column; tab expand; chat expand; 
    const IF_06a = LAYOUT_TWO_COLUMNS|LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM|LAYOUT_CHATROOM_COLLAPSED;
    const IF_06b = LAYOUT_TWO_COLUMNS|LAYOUT_TAB_EXPANDED|LAYOUT_CHATROOM|0;

    
    // two column; theater;
    const IF_04a = BF_TWOCOL_N_THEATER;
    const IF_04b = BF_TWOCOL_N_THEATER;

    // not fullscreen; two column; not theater; not tab expand; not EP expand; not expand chat
    const IF_05a = LAYOUT_FULLSCREEN|LAYOUT_TWO_COLUMNS|LAYOUT_THEATER|LAYOUT_TAB_EXPANDED|LAYOUT_ENGAGEMENT_PANEL_EXPAND|LAYOUT_CHATROOM_EXPANDED;
    const IF_05b = 0|LAYOUT_TWO_COLUMNS|0|0|0|0;



    if(new_isFullScreen){


      if (tab_change == LAYOUT_CHATROOM_EXPANDED && (new_layoutStatus & IF_06a) === IF_06b && statusCollapsedFalse && !column_mode_changed) {

        // two column; tab expand; chat expand; 
    
          switchTabActivity(null);


          
      }
 
      if( !!(tab_change & LAYOUT_CHATROOM_EXPANDED) && new_isExpandedChat ){
        //tab_change = LAYOUT_CHATROOM_EXPANDED
        //tab_change = LAYOUT_CHATROOM_EXPANDED|LAYOUT_TAB_EXPANDED
        
        timeline.setTimeout(() => {
          let scrollElement = document.querySelector('ytd-app[scrolling]')
          if(!scrollElement) return;
          // single column view; click button; scroll to tab content area 100%
          let chatFrame = document.querySelector('ytd-live-chat-frame#chat');
          if (chatFrame && isChatExpand()) {
            _console.log(7290,1)
            chatFrame.scrollIntoView(true);
          }
        }, 60)

      }

      
      


      if (!!(tab_change & LAYOUT_ENGAGEMENT_PANEL_EXPAND) && new_isExpandEPanel) {
        
        timeline.setTimeout(() => {
          let scrollElement = document.querySelector('ytd-app[scrolling]')
          if(!scrollElement) return;
          // single column view; click button; scroll to tab content area 100%
          let epPanel = document.querySelector('ytd-engagement-panel-section-list-renderer[visibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]');
          if (epPanel ) {
            _console.log(7290,2)

            let pi=50;
            let cid = setInterval(()=>{
              if(--pi) epPanel.scrollIntoView(true); else clearInterval(cid)
            },17)
            //
          }
        }, 60)

      }



    }else if (fullscreen_mode_changed) {


      

      if( !new_isFullScreen && statusCollapsedTrue && isWideScreenWithTwoColumns() && !isTheater()){
        showTabOrChat();
        requestVideoResize = true;
      } else if( !new_isFullScreen && statusCollapsedFalse && isWideScreenWithTwoColumns() && isTheater()){
        ytBtnCancelTheater();
        requestVideoResize = true;
      }

    }/*else if ( !fullscreen_mode_changed && !epanel_expanded_changed && !column_mode_changed && !theater_mode_changed && (chat_collapsed_changed||tab_expanded_changed) && !new_isExpandedChat && !new_isTabExpanded && new_isCollapsedChat ){

    // switch between live play video and replay video
    // force chat room display

    //if(lstTab){
      //if(lstTab.lastPanel!='#chatroom')
      //lstTab.lastPanel = '#chatroom';
      showTabOrChat();

    //}

    }*/ else if((new_layoutStatus & IF_01a) === IF_01b && !column_mode_changed && (tab_change==LAYOUT_CHATROOM_EXPANDED || tab_change==LAYOUT_ENGAGEMENT_PANEL_EXPAND) ){

    // two column; not theater; tab collapse; chat expand; ep expand



      if(epanel_expanded_changed){
        layoutStatusMutex.lockWith(unlock => {
          ytBtnCollapseChat();
          setTimeout(unlock,13)
        })
      }else if(chat_collapsed_changed){
        layoutStatusMutex.lockWith(unlock => {
          ytBtnCloseEngagementPanels();
          setTimeout(unlock,13)
        })

      }

    } else if (!tab_change && column_mode_changed && (new_layoutStatus & IF_02a) === IF_02b && moreThanOneShown) {

    // two column; not theater;
    // moreThanOneShown

      showTabOrChat();
      requestVideoResize = true;

    } else if (tab_change == LAYOUT_CHATROOM_EXPANDED && (new_layoutStatus & IF_03a) === IF_03b && statusCollapsedFalse && !column_mode_changed) {

    // two column; not theater; tab expand; chat expand; 

      switchTabActivity(null);
      requestVideoResize = true;

    } else if (isChatOrTabExpandTriggering && (new_layoutStatus & IF_04a) === IF_04b && statusCollapsedFalse && (changes & BF_TWOCOL_N_THEATER) === 0 ) {

      ytBtnCancelTheater();
      requestVideoResize = true;

    } else if ((new_layoutStatus & IF_04a) === IF_04b && statusCollapsedFalse) {

      hideTabAndChat();
      requestVideoResize = true;

    } else if (isChatOrTabCollaspeTriggering && (new_layoutStatus & IF_02a) === IF_02b && statusCollapsedTrue && !column_mode_changed) {

      if(tab_change==LAYOUT_ENGAGEMENT_PANEL_EXPAND){

        lstTab.lastPanel = null;

        if(new_isFullScreen){

        }else{
          showTabOrChat();
        }
      }else if(tab_change==LAYOUT_CHATROOM_EXPANDED){

        lstTab.lastPanel = null;

        if(new_isFullScreen){

        }else{
          showTabOrChat();
        }
      }else{

        
        if(new_isFullScreen){

        }else{

        ytBtnSetTheater();

        }

      }

      requestVideoResize = true;

    } else if (!tab_change && !!(changes & BF_TWOCOL_N_THEATER) && (new_layoutStatus & IF_02a) === IF_02b && statusCollapsedTrue) {

      showTabOrChat();
      requestVideoResize = true;

    } else if ( (new_layoutStatus & IF_05a) === IF_05b ) {
      // bug fix for restoring from mini player

      layoutStatusMutex.lockWith(unlock => {
        setToActiveTab();
        timeline.setTimeout(unlock, 40);
      })

      requestVideoResize = true;

    } else if (tab_expanded_changed) {

      requestVideoResize = true;

    }





    if (requestVideoResize) {

      timeout_resize_for_layout_change.clear();
      timeout_resize_for_layout_change.set(() => {
        dispatchWindowResize();
      }, 92)

    }




  }

  function fixLayoutStatus(x){


    const new_isExpandedChat = !(x & LAYOUT_CHATROOM_COLLAPSED) && (x & LAYOUT_CHATROOM)

    return new_isExpandedChat ? (x | LAYOUT_CHATROOM_EXPANDED) : (x & ~LAYOUT_CHATROOM_EXPANDED);

  }

  const wls = new Proxy({
    /** @type {number | null} */
    layoutStatus:undefined
  }, {
    get: function(target, prop) {
      return target[prop];
    },
    set: function(target, prop, value) {
      if(prop=='layoutStatus'){
          
        if (value === 0) {
          target[prop] = value;
          return true;
        }else if(target[prop]===value){
          return true;
        }else{
          if (!target.layoutStatus_pending) {
            target.layoutStatus_pending = true;
            const old_layoutStatus = target[prop];
            target[prop] = value;
            layoutStatusMutex.lockWith(unlock => {
              target.layoutStatus_pending = false;
              layoutStatusChanged((old_layoutStatus), (target[prop]));
              timeline.setTimeout(unlock, 40)
            })
            return true;
          }
        }
      }
      target[prop] = value;
      return true;
    },
    has: function(target, prop) {
      return (prop in target);
    }
  });






  const svgElm = (w, h, vw, vh, p) => `<svg width="${w}" height="${h}" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMid meet">${p}</svg>`

  let settings = {
    defaultTab: "#tab-videos"
  };



  function isVideoPlaying(video) {
    return video.currentTime > 0 && !video.paused && !video.ended && video.readyState > video.HAVE_CURRENT_DATA;
  }

  function wAttr(elm, attr, kv) {
    if (!elm || kv === null) {} else if (kv === true) { elm.setAttribute(attr, '') } else if (kv === false) { elm.removeAttribute(attr) } else if (typeof kv == 'string') { elm.setAttribute(attr, kv) }
  }

  function hideTabBtn(tabBtn) {
    //console.log('hideTabBtn', tabBtn)
    let isActiveBefore = tabBtn.classList.contains('active');
    tabBtn.classList.add("tab-btn-hidden");
    if (isActiveBefore) {
      setToActiveTab();
    }
  }

  function hasAttribute(obj, key) {
    return obj && obj.hasAttribute(key);
  }

  function isTheater() {
    const cssElm = kRef(ytdFlexy);
    return (cssElm && cssElm.hasAttribute('theater'))
  }

  function isFullScreen() {
    const cssElm = kRef(ytdFlexy);
    return (cssElm && cssElm.hasAttribute('fullscreen'))
  }

  function isChatExpand() {
    const cssElm = kRef(ytdFlexy);
    return cssElm && cssElm.hasAttribute('userscript-chatblock') && !cssElm.hasAttribute('userscript-chat-collapsed')
  }

  function isWideScreenWithTwoColumns() {
    const cssElm = kRef(ytdFlexy);
    return (cssElm && cssElm.hasAttribute('is-two-columns_'))
  }

  function isAnyActiveTab() {
    return $('#right-tabs .tab-btn.active').length > 0
  }

  function isEngagementPanelExpanded() { //note: not checking the visual elements
    const cssElm = kRef(ytdFlexy);
    return (cssElm && +cssElm.getAttribute('userscript-engagement-panel') > 0)
  }

  function engagement_panels_() {

    let res = [];
    let shownRes = [];

    let v = 0,
      k = 1,
      count = 0;
      
    for (const ePanel of document.querySelectorAll(
      `ytd-watch-flexy ytd-engagement-panel-section-list-renderer[o3r-${sa_epanel}]`
      )) {

      let visibility = ePanel.getAttribute('visibility') //ENGAGEMENT_PANEL_VISIBILITY_EXPANDED //ENGAGEMENT_PANEL_VISIBILITY_HIDDEN

      switch (visibility) {
        case 'ENGAGEMENT_PANEL_VISIBILITY_EXPANDED':
          v |= k;
          count++;
          shownRes.push(ePanel)
          res.push({ ePanel, k, visible: true });
          break;
        case 'ENGAGEMENT_PANEL_VISIBILITY_HIDDEN':
          res.push({ ePanel, k, visible: false });
          break;
        default:
          res.push({ ePanel, k, visible: false });
      }

      k = k << 1;

    }
    return { list: res, value: v, count: count, shownRes };
  }


  function ytBtnOpenEngagementPanel(/** @type {number | string} */ panel_id) {

    if (typeof panel_id == 'string') {
      panel_id = panel_id.replace('#engagement-panel-', '');
      panel_id = parseInt(panel_id);
    }
    if (panel_id >= 0) {} else return false;

    let panels = engagement_panels_();

    for (const { ePanel, k, visible } of panels.list) {
      if ((panel_id & k) === k) {
        if (!visible) ePanel.setAttribute('visibility', "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED");
      } else {
        if (visible) ytBtnCloseEngagementPanel(ePanel);
      }
    }

  }

  function ytBtnCloseEngagementPanel(/** @type {HTMLElement} */ s) {
    //ePanel.setAttribute('visibility',"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN");
    let button = querySelectorFromAnchor.call(s,'ytd-watch-flexy ytd-engagement-panel-title-header-renderer #header > #visibility-button');

    if (button){
      button = 
        querySelectorFromAnchor.call(button, 'div.yt-spec-touch-feedback-shape') || 
        querySelectorFromAnchor.call(button, 'ytd-button-renderer');
      if(button) button.click();
    }

  }

  function ytBtnCloseEngagementPanels() {
    if (isEngagementPanelExpanded()) {
      for (const s of document.querySelectorAll(
        `ytd-watch-flexy ytd-engagement-panel-section-list-renderer[o3r-${sa_epanel}]`
        )) {
        if (s.getAttribute('visibility') == "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED") ytBtnCloseEngagementPanel(s);
      }
    }
  }

  function ytBtnSetTheater() {
    if (!isTheater()) {
      const sizeBtn = document.querySelector('ytd-watch-flexy #ytd-player button.ytp-size-button')
      if (sizeBtn) sizeBtn.click();
    }
  }

  function ytBtnCancelTheater() {
    if (isTheater()) {
      const sizeBtn = document.querySelector('ytd-watch-flexy #ytd-player button.ytp-size-button')
      if (sizeBtn) sizeBtn.click();
    }
  }

  function ytBtnExpandChat() {
    let button = document.querySelector('ytd-live-chat-frame#chat[collapsed] > .ytd-live-chat-frame#show-hide-button')
    if (button){
      button = 
        querySelectorFromAnchor.call(button, 'div.yt-spec-touch-feedback-shape') || 
        querySelectorFromAnchor.call(button, 'ytd-toggle-button-renderer');
      if(button) button.click();
    }
  }

  function ytBtnCollapseChat() {
    let button = document.querySelector('ytd-live-chat-frame#chat:not([collapsed]) > .ytd-live-chat-frame#show-hide-button')
    if (button){
      button = 
        querySelectorFromAnchor.call(button, 'div.yt-spec-touch-feedback-shape') || 
        querySelectorFromAnchor.call(button, 'ytd-toggle-button-renderer');
      if(button) button.click();
    }
  }


  const Q = {}



  function chatFrameContentDocument() {
    // non-null if iframe exist && contentDocument && readyState = complete
    /** @type {HTMLIFrameElement | null} */ 
    let iframe = document.querySelector('ytd-live-chat-frame iframe#chatframe');
    if (!iframe) return null; //iframe must be there
    /** @type {Document | null} */ 
    let cDoc = null;
    try {
      cDoc = iframe.contentDocument;
    } catch (e) {}
    if (!cDoc) return null;
    if (cDoc.readyState != 'complete') return null; //we must wait for its completion

    return cDoc;

  }

  function chatFrameElement(/** @type {string} */ cssSelector) {
    let cDoc = chatFrameContentDocument();
    if (!cDoc) return null;
    /** @type {HTMLElement | null} */ 
    let elm = null;
    try {
      elm = cDoc.querySelector(cssSelector)
    } catch (e) {
      console.log('iframe error', e)
    }
    return elm;
  }




  function fixTabs() {


    if (!scriptEnable) return;


    let queryElement = document.querySelector('*:not(#tab-videos) > #related:not([non-placeholder-videos]) > ytd-watch-next-secondary-results-renderer')

    let isRelocated = !!queryElement;



    if (isRelocated) {

      let relocatedRelated = closestDOM.call(queryElement, '#related'); // NOT NULL

      let right_tabs = document.querySelector('#right-tabs');
      let tab_videos = querySelectorFromAnchor.call(right_tabs,"#tab-videos");

      if (!right_tabs || !tab_videos) return;

      for (const s of querySelectorAllFromAnchor.call(relocatedRelated,'#related')) {
        s.setAttribute('non-placeholder-videos', '')
      }

      let target_container = document.querySelector('ytd-watch-flexy:not([is-two-columns_]) #primary-inner, ytd-watch-flexy[is-two-columns_] #secondary-inner')

      if (target_container) target_container.append(right_tabs) // last-child


      let videos_related = relocatedRelated; // NOT NULL
      $('[placeholder-videos]').removeAttr('placeholder-videos');
      $('[placeholder-for-youtube-play-next-queue]').removeAttr('placeholder-for-youtube-play-next-queue');

      tab_videos.appendChild(videos_related);
      let videos_results_renderer = querySelectorFromAnchor.call(relocatedRelated,"ytd-watch-next-secondary-results-renderer");
      if (videos_results_renderer) videos_results_renderer.setAttribute('data-dom-changed-by-tabview-youtube', scriptVersionForExternal);
      videos_related.setAttribute('placeholder-for-youtube-play-next-queue', '')
      videos_related.setAttribute('placeholder-videos', '')

      $('[placeholder-videos]').on("scroll", windowScroll);




    }



    /** @type {HTMLElement | null} */ 
    let chatroom = null;
    if (chatroom = document.querySelector('*:not([data-positioner="before|#chat"]) + ytd-live-chat-frame#chat, ytd-live-chat-frame#chat:first-child')) {

      let positioner = document.querySelector('tabview-youtube-positioner[data-positioner="before|#chat"]');
      if (positioner) positioner.remove();


      if (document.querySelector('.YouTubeLiveFilledUpView')) {
        // no relocation
      } else {

        $(chatroom).insertBefore('#right-tabs')

      }


      $(positioner ? positioner : document.createElement('tabview-youtube-positioner')).attr('data-positioner', 'before|#chat').insertBefore(chatroom)



    }


  }

  function handlerAutoCompleteExist() {


    /** @type {HTMLElement} */ 
    let autoComplete = this;

    autoComplete.removeEventListener('autocomplete-sc-exist', handlerAutoCompleteExist, false)

    let domId = autoComplete.getAttribute('data-autocomplete-input-id')
    let searchBox = autoComplete.ownerDocument.querySelector(`[data-autocomplete-results-id="${domId}"]`)

    if (!domId || !searchBox) return;

    let positioner = searchBox.nextSibling;
    if (positioner && positioner.nodeName.toLowerCase() == "autocomplete-positioner") {} else if (positioner && positioner.nodeName.toLowerCase() != "autocomplete-positioner") {
      $(positioner = document.createElement("autocomplete-positioner")).insertAfter(searchBox);
    } else {
      $(positioner = document.createElement("autocomplete-positioner")).prependTo(searchBox.parentNode);
    }
    $(autoComplete).prependTo(positioner);

    positioner.style.setProperty('--sb-margin-bottom', getComputedStyle(searchBox).marginBottom)
    positioner.style.setProperty('--height', searchBox.offsetHeight + 'px')

  }

  function mtf_fixAutoCompletePosition(/** @type {HTMLElement} */ elmAutoComplete) {


    elmAutoComplete.setAttribute('autocomplete-disable-updatesc', '')
    elmAutoComplete.addEventListener('autocomplete-sc-exist', handlerAutoCompleteExist, false)

    let tf = ()=>{
      if(!document.documentElement.hasAttribute('tabview-injection-js-1-ready')) return setTimeout(tf, 300);
      document.dispatchEvent(new CustomEvent('tabview-fix-autocomplete'))
    }
    tf();
    //script_inject_facp.inject();

  }

  function mtf_AfterFixTabs() {


    /** @type {HTMLElement | null} */ 
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;

    /** @type {HTMLElement | null} */
    const rootElement = ytdFlexyElm;



    const autocomplete = querySelectorFromAnchor.call(rootElement,'[placeholder-for-youtube-play-next-queue] input#suggestions-search + autocomplete-positioner > .autocomplete-suggestions[data-autocomplete-input-id]:not([position-fixed-by-tabview-youtube])')

    if (autocomplete) {

      const searchBox = document.querySelector('[placeholder-for-youtube-play-next-queue] input#suggestions-search')


      if (searchBox) {


        autocomplete.parentNode.setAttribute('position-fixed-by-tabview-youtube', '');
        autocomplete.setAttribute('position-fixed-by-tabview-youtube', '');
        autocomplete.setAttribute('userscript-scrollbar-render', '')

        if (!searchBox.hasAttribute('is-set-click-to-toggle')) {
          searchBox.setAttribute('is-set-click-to-toggle', '')
          searchBox.addEventListener('click', function() {


            setTimeout(() => {
              const autocomplete = document.querySelector(`.autocomplete-suggestions[data-autocomplete-input-id="${ this.getAttribute('data-autocomplete-results-id') }"]`)

              if (!autocomplete) return;

              const isNotEmpty = (autocomplete.textContent || '').length > 0 && (this.value || '').length > 0;

              if (isNotEmpty) {

                let elmVisible = isDOMVisible(autocomplete)

                if (elmVisible) $(autocomplete).hide();
                else $(autocomplete).show();

              }

            }, 20);

          })

          let timeoutOnce_searchbox_keyup = new Timeout();
          searchBox.addEventListener('keyup', function() {

            timeoutOnce_searchbox_keyup.set(() => {

              const autocomplete = document.querySelector(`.autocomplete-suggestions[data-autocomplete-input-id="${ this.getAttribute('data-autocomplete-results-id') }"]`)

              if (!autocomplete) return;


              const isNotEmpty = (autocomplete.textContent || '').length > 0 && (this.value || '').length > 0

              if (isNotEmpty) {

                let elmVisible = isDOMVisible(autocomplete)

                if (!elmVisible) $(autocomplete).show();

              }

            }, 20);

          })

        }



      }

    }




    let currentLastVideo = querySelectorFromAnchor.call(rootElement,'[placeholder-videos] #items ytd-compact-video-renderer:last-of-type')
    let prevLastVideo = kRef(_cachedLastVideo);

    if (prevLastVideo !== currentLastVideo && currentLastVideo) {
      _cachedLastVideo = mWeakRef(currentLastVideo);
    }

    if (prevLastVideo !== currentLastVideo && currentLastVideo && prevLastVideo) {

      let isPrevRemoved = !prevLastVideo.parentNode


      function getVideoListHash() {

        let res = [...document.querySelectorAll('[placeholder-videos] #items ytd-compact-video-renderer')].map(renderer => {
          let a = querySelectorFromAnchor.call(renderer,'a[href*="watch"][href*="v="]')
          if(!a) return ''; //???
          return a.getAttribute('href')||''

        }).join('|')
        // /watch?v=XXXXX|/watch?v=XXXXXX|/watch?v=XXXXXX

        // alternative - DOM.data.videoId
        // let elms = document.querySelectorAll('[placeholder-videos] #items ytd-compact-video-renderer')
        // let res = [...elms].map(elm=>elm.data.videoId||'').join('|') ;

        if (res.indexOf('||') >= 0) {
          res = '';
        }

        return res ? res : null;
      }

      if (isPrevRemoved) {

        // this is the replacement of videos instead of addition

        const searchBox = document.querySelector('[placeholder-for-youtube-play-next-queue] input#suggestions-search')

        let currentPlayListHash = getVideoListHash() || null;

        if (!currentPlayListHash) {

        } else if (!videoListBeforeSearch && searchBox) {

          videoListBeforeSearch = currentPlayListHash;
          if (videoListBeforeSearch) {
            //console.log('fromSearch', videoListBeforeSearch)

            requestAnimationFrame(function() {

              let renderer = document.querySelector('[placeholder-videos] ytd-watch-next-secondary-results-renderer');
              if (searchBox && searchBox.parentNode) searchBox.blur();

              if (renderer) {
                let scrollParent = renderer.parentNode;
                if (scrollParent.scrollHeight > scrollParent.offsetHeight) {
                  let targetTop = renderer.offsetTop;
                  if (searchBox && searchBox.parentNode == scrollParent) targetTop -= searchBox.offsetHeight
                  scrollParent.scrollTop = targetTop - scrollParent.firstChild.offsetTop;
                }
              }

            });

          }

        } else if (videoListBeforeSearch) {

          if (currentPlayListHash != videoListBeforeSearch) {

            videoListBeforeSearch = null;
            //console.log('fromSearch', videoListBeforeSearch)


          }

        }


      }


    }




  }

  function base_ChatExist() {

    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return null;

    // no mutation triggering if the changes are inside the iframe 

    // 1) Detection of #continuations inside iframe
    // iframe ownerDocument is accessible due to same origin
    // if the chatroom is collapsed, no determination of live chat or replay (as no #continuations and somehow a blank iframe doc)

    // 2) Detection of meta tag
    // This is fastest but not reliable. It is somehow a bug that the navigation might not update the meta tag content

    // 3) Detection of HTMLElement inside video player for live video

    // (1)+(3) = solution

    let attr_chatblock = null
    let attr_chatcollapsed = null;

    const elmChat = document.querySelector('ytd-live-chat-frame#chat')
    let elmCont = null;
    if (elmChat) {
      elmCont = chatFrameElement('yt-live-chat-renderer #continuations')


      let s = 0;
      if (elmCont) {
        //not found if it is collapsed.
        s |= querySelectorFromAnchor.call(elmCont,'yt-timed-continuation') ? 1 : 0;
        s |= querySelectorFromAnchor.call(elmCont,'yt-live-chat-replay-continuation, yt-player-seek-continuation') ? 2 : 0;
        //s |= elmCont.querySelector('yt-live-chat-restricted-participation-renderer')?4:0;
        if (s == 1) {
          attr_chatblock = 'chat-live';
        }else if (s == 2) attr_chatblock = 'chat-playback';

        if (s == 1) $("span#tab3-txt-loader").text('');

      } else if (!ytdFlexyElm.hasAttribute('userscript-chatblock')) {
        // live chat frame but type not known
          
        attr_chatblock = '';

      }
      //keep unknown as original    
      
      
      let isCollapsed = !!elmChat.hasAttribute('collapsed');
      attr_chatcollapsed = isCollapsed;

    } else {
      attr_chatblock = false;
      attr_chatcollapsed = false;

    }

    return { attr_chatblock, attr_chatcollapsed }

  }






  let t_heated_BodyScroll = 0;

  function windowScroll() {
    let ct = Date.now();
    if (ct - t_heated_BodyScroll < 6) return; // avoid duplicate calling
    t_heated_BodyScroll = ct;
    window.dispatchEvent(new Event("scroll")); // dispatch Scroll Event to Window for content display
  }

/* items - > special case (2022/11/09) */ 
 


  // continuous check for element relocation
  function mtf_append_comments() {
    
    /** @type {HTMLElement | null} */
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;

    /** @type {HTMLElement | null} */
    const rootElement = ytdFlexyElm;

    let comments = querySelectorFromAnchorFizzy(rootElement,'comments', '#primary ytd-watch-metadata ~ ytd-comments#comments');
    if (comments) {
      
      _console.log(3202) 
      $(comments).appendTo('#tab-comments').attr('data-dom-changed-by-tabview-youtube', scriptVersionForExternal)
    }
  }

  // continuous check for element relocation
  function mtf_liveChatBtnF() {
    
    /** @type {HTMLElement | null} */
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;

    /** @type {HTMLElement | null} */
    const rootElement = ytdFlexyElm;

    let button = querySelectorFromAnchor.call(rootElement,'ytd-live-chat-frame#chat > .ytd-live-chat-frame#show-hide-button:nth-child(n+2)');
    if (button){
      let parentNode = closestDOM.call(button, 'ytd-live-chat-frame#chat');
      if (!parentNode){
        console.log('parentNode failed')
      } else if( HTMLElement.prototype.prepend ){
        // using prepend
        HTMLElement.prototype.prepend.call(parentNode, button)

      } else{
        // using insertBefore
        try{
          elementInsertBefore.call(parentNode, button, parentNode.firstChild);
        }catch(e){
          console.log('element insert failed in old browser CE')
        }
      }
    } 
    //if (button) button.parentNode.insertBefore(button, button.parentNode.firstChild)
  }



  // continuous check for element relocation
  // fired at begining & window resize, etc
  function mtf_append_playlist(playlist) {

    /** @type {HTMLElement | null} */
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm || !playlist) return;
 

    let ple1 = querySelectorFromAnchor.call(playlist, "*:not(#ytd-userscript-playlist) > ytd-playlist-panel-renderer#playlist:not(.ytd-miniplayer) #items.ytd-playlist-panel-renderer:not(:empty)");
    

    if (ple1) { 

      
      let ct = Date.now();

      let truePlaylist = closestDOM.call(ple1, 'ytd-playlist-panel-renderer#playlist');
      if(!truePlaylist || truePlaylist.nodeType!==1) truePlaylist = null;
      else {

        let tab_list = document.querySelector("#tab-list");

        if(!tab_list) return;

        truePlaylist.setAttribute('tabview-true-playlist', ct)


        for (const s of document.querySelectorAll(`ytd-playlist-panel-renderer#playlist:not([tabview-true-playlist="${ct}"])`)){
          s.removeAttribute('tabview-true-playlist')
        }
  
        let $wrapper = getWrapper('ytd-userscript-playlist')
        $wrapper.append(truePlaylist).appendTo(tab_list);
        truePlaylist.setAttribute('data-dom-changed-by-tabview-youtube', scriptVersionForExternal)
        setDisplayedPlaylist(); // relocation after re-layout
  
        requestAnimationFrame(() => {
          let ytdFlexyElm = kRef(ytdFlexy);
          if (!scriptEnable || !ytdFlexyElm) return;
          if (!switchTabActivity_lastTab && (ytdFlexyElm.getAttribute('tabview-selection') + '').indexOf('#tab-') === 0 && /https\:\/\/www\.youtube\.com\/watch.*[\?\&]list=[\w\-\_]+/.test(location.href)) {
            if (setToActiveTab('#tab-list')) switchTabActivity_lastTab = '#tab-list';
          }
        })

      }



    }
  }


  // content fix - info & playlist
  // fired at begining, and keep for in case any change
  function mtf_fix_details() {

    if (!scriptEnable) return;


    let contentToggleBtn = document.querySelector('ytd-watch-flexy #tab-info ytd-expander tp-yt-paper-button#less.ytd-expander:not([hidden]), #tab-info ytd-expander tp-yt-paper-button#more.ytd-expander:not([hidden])')

    if(contentToggleBtn){

      (()=> {
        const domElement = contentToggleBtn;
        contentToggleBtn = null;
        // if(!domElement.parentElement) return; // not working in pseudo custom element - parentNode = documentFragment
        const expander = closestDOM.call(domElement, 'ytd-watch-flexy #tab-info ytd-expander')

        if(!expander || expander.nodeType!==1) return; // checking whether it is still on the page
        
        if(expander.style.getPropertyValue('--ytd-expander-collapsed-height')){
          expander.style.setProperty('--ytd-expander-collapsed-height','')
        }
        nativeCall(expander, [
          {'property':'canToggleJobId','value':1}, // false disable calculateCanCollapse in childrenChanged
          {'property':'alwaysToggleable','value':false}, // this is checked in childrenChanged
          {'property':'recomputeOnResize','value':false}, // no need to check toggleable
          {'property':'isToggled','value':true}, // show full content
          {'property':'canToggle','value':false}, // hide show more or less btn
          {'property':'collapsedHeight','value':999999} // disable collapsed height check
        ])

      })();
    }

    let strcturedInfo=document.querySelector('ytd-watch-flexy #tab-info ytd-structured-description-content-renderer.style-scope.ytd-video-secondary-info-renderer[hidden]')
    if(strcturedInfo){

      (()=>{

        strcturedInfo.removeAttribute('hidden');
      })();
    }

/*
    let inlineInfoExpander = document.querySelector('ytd-watch-flexy #description.ytd-watch-metadata ytd-text-inline-expander#description-inline-expander.ytd-watch-metadata yt-formatted-string[split-lines].ytd-text-inline-expander');
    let vsInfoExpander = document.querySelector('#tab-info ytd-expander.ytd-video-secondary-info-renderer #description.ytd-video-secondary-info-renderer yt-formatted-string[split-lines].ytd-video-secondary-info-renderer')
    console.log(23234, inlineInfoExpander, vsInfoExpander, inlineInfoExpander.textContent, vsInfoExpander.textContent)
    if(inlineInfoExpander && vsInfoExpander && inlineInfoExpander.textContent===vsInfoExpander.textContent){

      inlineInfoExpander.classList.add('tabview-hidden-info')

    }*/




    // just in case the playlist is collapsed
    let playlist = document.querySelector('#tab-list ytd-playlist-panel-renderer#playlist')
    if(playlist && playlist.matches('[collapsed], [collapsible]')) {
      
      (()=> {
        
        const domElement = playlist;
        playlist = null;
        // if(!domElement.parentElement || domElement.nodeType!==1) return; // not working in pseudo custom element - parentNode = documentFragment
        const tablist = closestDOM.call(domElement, 'ytd-watch-flexy #tab-list')

        if(!tablist || tablist.nodeType!==1) return; // checking whether it is still on the page

        if (domElement.hasAttribute('collapsed')) wAttr(domElement, 'collapsed', false);
        if (domElement.hasAttribute('collapsible')) wAttr(domElement, 'collapsible', false);
      })();
    }



  }



  let mTime = Date.now()-152000000;
  //let loadedComments = [];

  const innerCommentsFuncs=[
    // comments
    function(){
              
      _console.log(2907,1)

      let span = document.querySelector("span#tab3-txt-loader")
      let r = '0';
      let txt = this.elm.textContent
      if (typeof txt == 'string') {
        let m = txt.match(/[\d\,\s]+/)
        if (m) {
          r = m[0].trim()
        }
      }
      
      if (span){
        let tab_btn = closestDOM.call(span,'.tab-btn[userscript-tab-content="#tab-comments"]')
        if(tab_btn)tab_btn.setAttribute('loaded-comment','normal')
        span.textContent = r;
      }  
      
      setCommentSection(1); 
    },
    // message
    function(){
      _console.log(2907,2)
      let span = document.querySelector("span#tab3-txt-loader")
      if (span){
        let tab_btn = closestDOM.call(span,'.tab-btn[userscript-tab-content="#tab-comments"]')
        if(tab_btn)tab_btn.setAttribute('loaded-comment','message')
        span.textContent ='\u200B';
      } 
      
      setCommentSection(1); 
    }
  ]

    /** @type {WeakMap<HTMLElement>} */
  let loadedCommentsDT = new WeakMap();

  let cmTime = 0;




  function _innerCommentsLoader() {

    /** @type {HTMLElement | null} */
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;

    _console.log(3434, pageType)
    if (pageType!=='watch') return;



    //console.log(823100,rootElement)

    /** @type {Array<HTMLElement>} */
    let qmElms = [...document.querySelectorAll('ytd-comments#comments #count.ytd-comments-header-renderer, ytd-comments#comments ytd-item-section-renderer.ytd-comments#sections #header ~ #contents > ytd-message-renderer.ytd-item-section-renderer')]


    let eTime = +`${Date.now()-mTime}00`; 

    let res = new Array(qmElms.length);
    res.newFound = false;

    

    let ci = 0;
    let latest = -1;

    let retrival = cmTime;
    cmTime = eTime;
  
    for(const qmElm of qmElms){

      let mgz = 0
      if (qmElm.id === 'count') {
        //#count.ytd-comments-header-renderer
        mgz = 1;
      } else if ((qmElm.textContent || '').trim()) {
        //ytd-message-renderer.ytd-item-section-renderer
        mgz = 2;
        // it is possible to get the message before the header generation.
        // sample link - https://www.youtube.com/watch?v=PVUZ8Nvr1ic
        // sample link - https://www.youtube.com/watch?v=yz8AiQc1Bk8
      }

      if(mgz>0){


        let lastUpdate = loadedCommentsDT.get(qmElm)||0;
        let diff = retrival-lastUpdate
        _console.log(2907, diff)
        let isNew = (diff>4 || diff<-4);
        if(!isNew){
          loadedCommentsDT.set(qmElm,eTime);
        }else{
          loadedCommentsDT.set(qmElm,eTime+1);
          res.newFound = true;
          latest = ci;
        }
        
        res[ci]={
          status: mgz,
          text: qmElm.textContent,
          elm: qmElm,
          isNew: isNew,
          isLatest: false, //set afterwards
          f: innerCommentsFuncs[mgz-1]
        }

        
        ci++;
        
      }


    }
    if(res.length>ci) res.length=ci;
    
    if(latest>=0){
      res[latest].isLatest = true;
    }





    _console.log(2908, res)

    return res;


  }

  // function _innerCommentsLoader() {

  //   /** @type {HTMLElement | null} */
  //   let ytdFlexyElm = kRef(ytdFlexy);
  //   if (!scriptEnable || !ytdFlexyElm) return;

  //   if (deferredVarYTDHidden) return;



  //   //console.log(823100,rootElement)

  //   /** @type {Array<HTMLElement>} */
  //   let qmElms = [...document.querySelectorAll('ytd-comments#comments #count.ytd-comments-header-renderer, ytd-comments#comments ytd-item-section-renderer.ytd-comments#sections #header ~ #contents > ytd-message-renderer.ytd-item-section-renderer')]


  //   let di = 0;
  //   let dz = false;
  //   /** @type {WeakSet<HTMLElement>} */
  //   let dS = new WeakSet()
  //   for (const loadedComment of loadedComments) {
  //     let loadedCommentElm = loadedComment ? kRef(loadedComment) : null;

  //     if (!loadedCommentElm || !qmElms.includes(loadedCommentElm)) {
  //       loadedComments[di] = null;
  //       dz = true;
  //     } else {
  //       dS.add(loadedCommentElm)
  //     }
  //     di++;
  //   }
  //   if (dz) {
  //     loadedComments = loadedComments.filter(e => !!e)
  //   }

  //   let res = new Array(qmElms.length);
  //   res.newFound = false;

  //   let ci = 0;
  //   for (const qmElm of qmElms) {

  //     let mgz = 0
  //     if (qmElm.id === 'count') {
  //       //#count.ytd-comments-header-renderer
  //       mgz = 1;
  //     } else if ((qmElm.textContent || '').trim()) {
  //       //ytd-message-renderer.ytd-item-section-renderer
  //       mgz = 2;
  //       // it is possible to get the message before the header generation.
  //       // sample link - https://www.youtube.com/watch?v=PVUZ8Nvr1ic
  //       // sample link - https://www.youtube.com/watch?v=yz8AiQc1Bk8
  //     }

  //     if (mgz > 0) {
 
  //       let isNew = !dS.has(qmElm)
  //       if (isNew) {
  //         loadedComments.push(mWeakRef(qmElm))
  //         res.newFound = true;
  //       }

  //       res[ci] = {
  //         status: mgz,
  //         text: qmElm.textContent,
  //         elm: qmElm,
  //         isNew: isNew,
  //         f: innerCommentsFuncs[mgz-1]
  //       }

  //     }
 
  //     ci++;

  //   }

  //   let lastElm = kRef(loadedComments[loadedComments.length - 1])

  //   for (const entry of res) {
  //     entry.isLatest = entry.elm === lastElm;
  //   }

  //   dS = null



  //   _console.log(2908, res)

  //   return res;


  // }


  
  function restoreFetching(){


    if(mtf_forceCheckLiveVideo_disable===2) return;


    let ytdFlexyElm = kRef(ytdFlexy);
    if(!ytdFlexyElm) return;

    _console.log(2901)

    if(isCommentsK(ytdFlexyElm))return;

    _console.log(2902)

    let visibleComments = querySelectorFromAnchor.call(ytdFlexyElm, 'ytd-comments#comments:not([hidden])')
    if(!visibleComments) return;

    _console.log(2903) 

    
    fetchPendings.length= 0 ;
    fetched=false;

    akAttr(ytdFlexyElm, 'tabview-youtube-comments', false, 'K');

    const tabBtn = document.querySelector('[userscript-tab-content="#tab-comments"]');
    let span = querySelectorFromAnchor.call(tabBtn,'span#tab3-txt-loader');
    tabBtn.removeAttribute('loaded-comment')
    span.innerHTML='';

    if(tabBtn){
      tabBtn.classList.remove("tab-btn-hidden")
    }
      
    _console.log(2905)
 


  }

  let fetched = false;
  let pendingFetch = null;
  const comments_ulfx = (innerCommentsLoaderRet)=> {

    if (!scriptEnable || !ytdFlexy || !kRef(ytdFlexy)) return;

    if (pageType!=='watch') return;

    _console.log(980, 1)


    let newFound = innerCommentsLoaderRet.newFound;

    let b = innerCommentsLoaderRet

    _console.log(980, 2, !newFound)

    if (!newFound) {
      if (b.length === 1) {
        _console.log(980, 3, 1)
        let entry = b[0]
        pendingFetch = entry;
      }
      return;
    } 

    pendingFetch=null;

    if (b.length === 1) {

      _console.log(980, 3, 3)
      let entry = b[0]
      entry.f();
      fetched = true;

    } else if (b.length > 1) {

      _console.log(980, 3, 5)
      let yy = null;
      for (const entry of b) {
        if (entry.isLatest === true && entry.isNew) {
          yy = entry;
          break;
        }
      }

      _console.log(980, 3, 6, yy)
      if (yy) {
        yy.f();
        fetched = true;
      }

    }
    
    _console.log(2907, innerCommentsLoaderRet)

  };


  let mtc_nr_comments=0;
  const cssOnceFunc_comments = (comments)=>{
      
    // once per {ytd-comments#comments} detection

    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;

    if (!comments) return;
    _console.log(3901)

    if(mtoVisibility_Comments.bindElement(comments)){
      mtoVisibility_Comments.observer.check(9);
    }
    

  };

  const cssOnceFunc_teaserInfo = (teaserInfo)=>{
    //obsolete?

      // for Teaser UI
      // once per {#description-and-actions.style-scope.ytd-watch-metadata > #description > ytd-text-inline-expander} detection

      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return ;
      let addedInfo = document.querySelector('#tab-info ytd-expander[tabview-info-expander]');

      if(!addedInfo) return;

      if(!document.documentElement.hasAttribute('tabview-injection-js-1-ready')) return;

      _console.log(3903)

      teaserInfo.setAttribute('tabview-removed-duplicate','')


      teaserInfo.dispatchEvent(new CustomEvent('tabview-no-duplicate-info'))
      //console.log(56)



  }

  function setOnlyOneEPanel(ePanel){

    layoutStatusMutex.lockWith(unlock => {

      let cPanels = engagement_panels_();
      for (const entry of cPanels.list) {
        if (entry.ePanel != ePanel && entry.visible) ytBtnCloseEngagementPanel(entry.ePanel);
      }
      setTimeout(unlock, 30)

    })

  }

  function immHidden(){
 
    //if(t_preheat_ImmHidden>Date.now()) return setTimeout(immHidden,400); // avoid timeline reset due to change of video
    
    let comments = document.querySelector('ytd-comments#comments')

    if(!comments.hasAttribute('hidden')) return; // visible comments content


    if(pageType==='watch' && Q.comments_section_loaded===1){
 
      emptyCommentSection();

    }

  }

  const FP = {

    mtoBodyF: ( /** @type {MutationRecord[]} */ mutations, /** @type {MutationObserver} */ observer) => {
      //subtree DOM mutation checker - {body} \single \subtree

      if (!scriptEnable) return;
      if (pageType!=='watch') return;

      for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes){
          if (addedNode.nodeType === 1) {
            if (addedNode.nodeName == "DIV" && addedNode.matches('.autocomplete-suggestion:not([autocomplete-disable-updatesc])') ) {
              mtf_fixAutoCompletePosition(addedNode)
            }else if(addedNode.nodeName == "DIV" && (addedNode.id==='lyricscontainer' || addedNode.id==='showlyricsbutton')){

              goYoutubeGeniusLyrics();

            }
          }
        }
      }

    },

    mtf_attrPlaylist: (attrName, newValue) => {
      //attr mutation checker - {ytd-playlist-panel-renderer#playlist} \single
      //::attr ~ hidden    
      //console.log(1210)

      _console.log(21311)
      if (!scriptEnable) return;
      if (pageType!=='watch') return;
      let cssElm = kRef(ytdFlexy);
      if (!cssElm) return;

      _console.log(21312)

      let playlist = document.querySelector('ytd-playlist-panel-renderer#playlist[tabview-true-playlist]')
      let isAnyPlaylistExist = playlist && !playlist.hasAttribute('hidden');
      const tabBtn = document.querySelector('[userscript-tab-content="#tab-list"]');
      //console.log(1212.2, isPlaylistHidden, playlist.getAttribute('hidden'))
      if (tabBtn) {
        //console.log('attr playlist changed')
        let isPlaylistTabHidden = tabBtn.classList.contains('tab-btn-hidden')
        if (isPlaylistTabHidden && isAnyPlaylistExist) {
          //console.log('attr playlist changed - no hide')
          tabBtn.classList.remove("tab-btn-hidden");
        } else if (!isPlaylistTabHidden && !isAnyPlaylistExist) {
          //console.log('attr playlist changed - add hide')
          hideTabBtn(tabBtn);
        }
      }
      /* visible layout for triggering hidden removal */
      akAttr(cssElm, 'tabview-youtube-playlist', !isAnyPlaylistExist);
    },
    mtf_attrComments: (attrName, newValue) => {
      //attr mutation checker - {ytd-comments#comments} \single
      //::attr ~ hidden

      // *** consider this can happen immediately after pop state. timeout / interval might clear out.

      if (pageType!=='watch') return;

      let comments = document.querySelector('ytd-comments#comments')
      const tabBtn = document.querySelector('[userscript-tab-content="#tab-comments"]');
      if (!comments || !tabBtn) return;
      let isCommentHidden = comments.hasAttribute('hidden')
      //console.log('attr comments changed')

      
      

      
      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return;

      if( mtf_forceCheckLiveVideo_disable === 2 ){

      }else if (!isCommentHidden) {

 

          akAttr(ytdFlexyElm, 'tabview-youtube-comments', false, 'K');
          emptyCommentSection();
          tabBtn.classList.remove("tab-btn-hidden") //if contains

        

      } else if (isCommentHidden) {
        

        akAttr(ytdFlexyElm, 'tabview-youtube-comments', true, 'K'); 
        immHidden();

      }


    },


    mtf_attrChatroom: (attrName, newValue) => {
      //attr mutation checker - {ytd-live-chat-frame#chat} \single
      //::attr ~ collapsed



      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return;
      if (pageType!=='watch') return;


      setToggleBtnTxt();


      layoutStatusMutex.lockWith(unlock => {

        const chatBlock = document.querySelector('ytd-live-chat-frame#chat')
        const cssElm = kRef(ytdFlexy)

        if (!chatBlock || !cssElm) {
          unlock();
          return;
        }

        if (pageType!=='watch') {
          unlock();
          return;
        }

        if (!cssElm.hasAttribute('userscript-chatblock')) wAttr(cssElm, 'userscript-chatblock', true);
        
        _console.log(332,ytdFlexyElm.hasAttribute('userscript-chatblock'))
        let isCollapsed = !!chatBlock.hasAttribute('collapsed');
        wAttr(cssElm, 'userscript-chat-collapsed', isCollapsed);

        if (cssElm.hasAttribute('userscript-chatblock') && !isCollapsed) lstTab.lastPanel = '#chatroom';

        if (!isCollapsed && document.querySelector('#right-tabs .tab-btn.active') && isWideScreenWithTwoColumns() && !isTheater()) {
          switchTabActivity(null);
          timeline.setTimeout(unlock, 40);
        } else {
          unlock();
        }

        if (isCollapsed) {
          chatBlock.removeAttribute('yt-userscript-iframe-loaded');
        }

      })




    },

    mtf_attrEngagementPanel: ( /** @type {MutationRecord[]} */ mutations, /** @type {MutationObserver} */ observer) => {
      //attr mutation checker - {ytd-engagement-panel-section-list-renderer} \mutiple
      //::attr ~ visibility

      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return;

      //multiple instance
      if (mutations) {
        for (const mutation of mutations) {
          let ePanel = mutation.target;
          if (ePanel.getAttribute('visibility') == 'ENGAGEMENT_PANEL_VISIBILITY_EXPANDED') {
            setOnlyOneEPanel(ePanel);
            break;
          }
        }
      }
      if (pageType!=='watch') return;

      layoutStatusMutex.lockWith(unlock => {

        const ePanel = document.querySelector('ytd-watch-flexy ytd-engagement-panel-section-list-renderer')
        const cssElm = kRef(ytdFlexy)

        if (!ePanel || !cssElm) {
          unlock();
          return;
        }
        let previousValue = +cssElm.getAttribute('userscript-engagement-panel') || 0;

        let { shownRes, value, count } = engagement_panels_();
        let nextValue = value;
        let nextCount = count;


        if (nextCount == 0 && cssElm.hasAttribute('userscript-engagement-panel')) {
          storeLastPanel=null;
          wAttr(cssElm, 'userscript-engagement-panel', false);
          unlock();
        } else {

          if ((nextCount > 1) || (cssElm.hasAttribute('userscript-engagement-panel') && previousValue === nextValue)) {
            unlock();
            return;
          }

          cssElm.setAttribute('userscript-engagement-panel', nextValue);

          let b = false;
          if (previousValue != nextValue && nextValue > 0) {
            lstTab.lastPanel = `#engagement-panel-${nextValue}`;
            b = true;
            storeLastPanel = mWeakRef( shownRes[0])
            //console.log(9999, shownRes[0])
          }

          if (b && document.querySelector('#right-tabs .tab-btn.active') && isWideScreenWithTwoColumns() && !isTheater()) {
            switchTabActivity(null);
            timeline.setTimeout(unlock, 40);
          } else {
            unlock();
          }
        }

      })




    },

    mtf_initalAttr_chatroom: () => {
      // every per [new] {ytd-live-chat-frame#chat} detection - reset after mini-playview
      
      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return true;

      const rootElement = ytdFlexyElm;


      if (!mgChatFrame.inPage()) {

        mtoVisibility_Chatroom.clear(true);

        let chatroom = querySelectorFromAnchor.call(rootElement,`ytd-live-chat-frame#chat:not([${sa_chatroom}]`)
        if (chatroom) {
          mgChatFrame.setVar(chatroom);

          //console.log(124,chatroom)
          if(mtoVisibility_Chatroom.bindElement(chatroom)){
            mtoVisibility_Chatroom.observer.check(9)
            
          }

          chatroom = null
        }
      }
      return true;

    },
 





  }





  /** @type {WeakRef | null} */ 
  let displayedPlaylist = null;
  
  /** @type {WeakRef | null} */ 
  let scrollingVideosList = null;

  let scriptEnable = false;
  let scriptEC = 0;
  let lstTab = null;
  
  function lstTabInit(){
    lstTab = 
    {
      lastTab: null,
      lastPanel: null,
      last: null
    };
  }

  let _cachedLastVideo = null;
  let videoListBeforeSearch = null;

  /** @type {WeakRef | null} */ 
  let ytdFlexy = null;

  function pluginUnhook() {
    _pluginUnhook();
    emptyCommentSection();
  }

  function _pluginUnhook() {

    //console.log(8001)

    videoListBeforeSearch = null;
    _cachedLastVideo = null;
    lstTabInit()
    displayedPlaylist = null;
    scrollingVideosList = null;
    scriptEnable = false;
    scriptEC++;
    if (scriptEC > 788888888) scriptEC = 188888888;
    ytdFlexy = null;
    wls.layoutStatus = 0;

    //console.log('unc01')

    mtoVisibility_EngagementPanel.clear(true)
    mtoVisibility_Playlist.clear(true)
    mtoVisibility_Comments.clear(true)

    mgChatFrame.kVar = null;
    mtoVisibility_Chatroom.clear(true)
    mtoFlexyAttr.clear(true)

    

    for (const elem of document.querySelectorAll(
      ['ytd-expander[tabview-info-expander]'].join(', ')
      )) {
        elem.removeAttribute('tabview-info-expander');
    }

    
    mtoMutation_body.clear(true)
    Q.mtf_chatBlockQ = null;


    

  }

  


  let pageLang = 'en';
  const langWords ={
    'en':{
      //'share':'Share',
      'info':'Info',
      'videos':'Videos',
      'playlist':'Playlist'
    },
    'jp':{
      //'share':'共有',
      'info':'情報',
      'videos':'動画',
      'playlist':'再生リスト'
    },
    'tw':{
      //'share':'分享',
      'info':'資訊',
      'videos':'影片',
      'playlist':'播放清單'
    },
    'cn':{
      //'share':'分享',
      'info':'资讯',
      'videos':'视频',
      'playlist':'播放列表'
    },
    'du':{
      //'share':'Teilen',
      'info':'Info',
      'videos':'Videos',
      'playlist':'Playlist'
    },
    'fr':{
      //'share':'Partager',
      'info':'Info',
      'videos':'Vidéos',
      'playlist':'Playlist'
    },
    'kr':{
      //'share':'공유',
      'info':'정보',
      'videos':'동영상',
      'playlist':'재생목록'
    }
  };

  function getWord(tag){
    return langWords[pageLang][tag]||langWords['en'][tag]||'';
  }


  function getTabsHTML() {

    const sTabBtnVideos = `${svgElm(16,16,298,298,svgVideos)}<span>${getWord('videos')}</span>`;
    const sTabBtnInfo = `${svgElm(16,16,23.625,23.625,svgInfo)}<span>${getWord('info')}</span>`;
    const sTabBtnPlayList = `${svgElm(16,16,426.667,426.667,svgPlayList)}<span>${getWord('playlist')}</span>`;

    let str1 = `
        <paper-ripple class="style-scope yt-icon-button">
            <div id="background" class="style-scope paper-ripple" style="opacity:0;"></div>
            <div id="waves" class="style-scope paper-ripple"></div>
        </paper-ripple>
        `;

    let str_fbtns = `
    <div class="font-size-right">
    <div class="font-size-btn font-size-plus">
    <svg width="12" height="12" viewbox="0 0 50 50" preserveAspectRatio="xMidYMid meet" 
    stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-size">
      <path d="M12 25h26"/><path d="M25 12v26"/>
    </svg>
    </div><div class="font-size-btn font-size-minus">
    <svg width="12" height="12" viewbox="0 0 50 50" preserveAspectRatio="xMidYMid meet"
    stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-size">
      <path d="M12 25h26"/>
    </svg>
    </div>
    </div>
    `.replace(/[\r\n]+/g,'');

    const str_tabs = [
            `<a id="tab-btn1" data-name="info" userscript-tab-content="#tab-info" class="tab-btn">${sTabBtnInfo}${str1}${str_fbtns}</a>`,
            `<a id="tab-btn3" userscript-tab-content="#tab-comments" data-name="comments" class="tab-btn">${svgElm(16,16,60,60,svgComments)}<span id="tab3-txt-loader"></span>${str1}${str_fbtns}</a>`,
            `<a id="tab-btn4" userscript-tab-content="#tab-videos" data-name="videos" class="tab-btn">${sTabBtnVideos}${str1}${str_fbtns}</a>`,
            `<a id="tab-btn5" userscript-tab-content="#tab-list" class="tab-btn tab-btn-hidden">${sTabBtnPlayList}${str1}${str_fbtns}</a>`
        ].join('');

    let addHTML = `
        <div id="right-tabs">
            <header>
                <div id="material-tabs">
                    ${str_tabs}
                </div>
            </header>
            <div class="tab-content">
                <div id="tab-info" class="tab-content-cld tab-content-hidden" userscript-scrollbar-render></div>
                <div id="tab-comments" class="tab-content-cld tab-content-hidden" userscript-scrollbar-render></div>
                <div id="tab-videos" class="tab-content-cld tab-content-hidden" userscript-scrollbar-render></div>
                <div id="tab-list" class="tab-content-cld tab-content-hidden" userscript-scrollbar-render></div>
            </div>
        </div>
        `;

    return addHTML;

  }

  function getLang(){

    let lang = 'en';
    let htmlLang = ((document||0).documentElement||0).lang||'';
    switch (htmlLang) {
      case 'en':
      case 'en-GB':
        lang = 'en';
        break;
      case 'de':
      case 'de-DE':
        lang = 'du';
        break;
      case 'fr':
      case 'fr-CA':
      case 'fr-FR':
        lang = 'fr';
        break;
      case 'zh-Hant':
      case 'zh-Hant-HK':
      case 'zh-Hant-TW':
        lang = 'tw';
        break;
      case 'zh-Hans':
      case 'zh-Hans-CN':
        lang = 'cn';
        break;
      case 'ja':
      case 'ja-JP':
        lang = 'jp';
        break;
      case 'ko':
      case 'ko-KR':
        lang = 'kr';
        break;
      default:
        lang = 'en';
    }
    
    if(langWords[lang]) pageLang = lang; else pageLang = 'en';

  }

  function checkEvtTarget(evt, nodeNames){
    return nodeNames.includes((((evt||0).target||0).nodeName||0));
  }



  let cid_nav_end = 0;
  let rc_nav_end = 0;

  const symbol_noRepeat = Symbol();

  function globalHook(eventType, func){

    
    document.addEventListener(eventType,function(evt){
      if(evt[symbol_noRepeat])return;
      evt[symbol_noRepeat]=true;

      new Promise(()=>{

        func(evt);

      })

    },capturePassive)

  }

  

  let initializerResolve = null;

  let initializerLock = new Promise(resolve=>{initializerResolve=resolve});

  const S_GENERAL_RENDERERS = ['YTD-TOGGLE-BUTTON-RENDERER','YTD-MENU-RENDERER']




  function pageCheck(){
    // yt-rendererstamper-finished
    // yt-player-updated
    // yt-page-data-updated
    // yt-watch-comments-ready
    // [is-two-columns_] attr changed
    
    let m_teaser_info = document.querySelector('#description-and-actions.style-scope.ytd-watch-metadata > #description ytd-text-inline-expander:not([tabview-removed-duplicate])')
    if(m_teaser_info) cssOnceFunc_teaserInfo(m_teaser_info)
    
    
    mtf_append_comments();
    mtf_liveChatBtnF();
    fixTabs();
    mtf_AfterFixTabs();

  }

  globalHook('yt-rendererstamper-finished',(evt)=>{
    

    
    if(!evt || !evt.target || evt.target.nodeType !== 1) return;

    _console.log(evt.target.nodeName,904, evt.type, evt.detail);
    (async ()=>{

      await initializerLock;

    const nodeName = evt.target.nodeName.toUpperCase();
    const node = evt.target
    _console.log(evt.target.nodeName,905, evt.type, document.querySelector('ytd-live-chat-frame#chat'));
/*
    if(toggleBtnDC>0){

    }else if(toggleBtnDC){

      fixChatFrameToggleButton();
      toggleBtnDC=2;
    }*/
    
    if(!S_GENERAL_RENDERERS.includes(nodeName)){

      mtc_nr_comments = Date.now();
      

      switch(nodeName){
        case 'YTD-ENGAGEMENT-PANEL-SECTION-LIST-RENDERER':
          // ignore; trigger by page-updated
          break;
        default:
          _console.log(782,1, nodeName)
          pageCheck();
      }
    }else if(nodeName=='YTD-TOGGLE-BUTTON-RENDERER'){
      _console.log(933,0)
      //fixChatFrameToggleButton();
    }

    
    _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))
    //console.log(2344, document.querySelector('ytd-live-chat-frame#chat')?5:2)
    
    //console.log(555, document.querySelectorAll('#meta-contents ytd-expander').length)
    if(nodeName === 'YTD-MENU-RENDERER'){
      //console.log('YTD-MENU-RENDERER !! ', evt.target)
    }

    if(nodeName === 'YTD-PLAYLIST-PANEL-RENDERER'){
      //("yt-playlist-data-updated");
      //yt-playlist-reloading
      mtf_append_playlist(node);
      
      let m_playlist = document.querySelector(`ytd-playlist-panel-renderer#playlist[tabview-true-playlist]:not([o3r-${sa_playlist}])`)

      // once per {ytd-playlist-panel-renderer#playlist} detection

      _console.log(3902, !!m_playlist)

      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm){}
      else if (m_playlist){

        if(mtoVisibility_Playlist.bindElement(m_playlist)){
          mtoVisibility_Playlist.observer.check(9); //delay check required for browser bug - hidden changed not triggered 
        }
        m_playlist = null;

      }
 
       
      
      FP.mtf_attrPlaylist();

    }else if (nodeName ==='YTD-WATCH-METADATA'){
      

    }else if (nodeName ==='YTD-COMMENTS-HEADER-RENDERER'){
      _console.log(3205,1)


        
        let innerCommentsLoaderRet = _innerCommentsLoader();
        comments_ulfx(innerCommentsLoaderRet);
        _console.log(3205,3)

      
      if(!fetched && pendingFetch){
        requestAnimationFrame(()=>{

          pendingFetch.f();
          fetched= true;
          fetchCommentsFinished();
          fetched=false;pendingFetch=null;
        })
      }
      

      if(fetched){
        fetchCommentsFinished();
        fetched=false;pendingFetch=null;
      }

      



    }else if(nodeName==='YTD-ENGAGEMENT-PANEL-SECTION-LIST-RENDERER'){


      let ytdFlexyElm = kRef(ytdFlexy);
      if (scriptEnable && ytdFlexyElm) {


        let match = node.matches(`ytd-watch-flexy ytd-engagement-panel-section-list-renderer:not([o3r-${sa_epanel}])`);
        if(match){


          mtoVisibility_EngagementPanel.bindElement(node, {
            attributes: true,
            attributeFilter: ['visibility'],
            attributeOldValue: true
          })
          
  


        }



      }
  

    }



    })()
    

  })

  
  globalHook('yt-player-updated',(evt)=>{


    
    if(!evt || !evt.target || evt.target.nodeType !== 1) return;

    mtc_nr_comments = Date.now();

    _console.log(evt.target.nodeName,904, evt.type);
    
    _innerCommentsLoader();
    //restoreFetching(); //yt-player-updated might happen after comments ready
    if(!fetched){
      window.dispatchEvent(new Event("scroll")); 
    }
    
    pageCheck();
    //fixChatFrameToggleButton();

    (async ()=>{
      
      await initializerLock;
      
      let nodeName = evt.target.nodeName.toUpperCase()
      
      _console.log(nodeName,905, evt.type)

      _console.log(2344,evt.type, document.querySelector('ytd-live-chat-frame#chat')?5:2)


      if(nodeName === 'YTD-PLAYER'){

        _console.log(2554, nodeName, evt.type, evt.detail )

        let m_comments = document.querySelector(`ytd-comments#comments:not([o3r-${sa_comments}])`);
        if(m_comments) cssOnceFunc_comments(m_comments);
    
        FP.mtf_initalAttr_chatroom(); 

      }

    })();

    


  })


  let foundIframe=()=>{
    
    FP.mtf_initalAttr_chatroom(); 
    
    if(document.querySelector('ytd-watch-flexy[theater]')&&document.querySelector('ytd-live-chat-frame#chat:not([collapsed])')){
      document.querySelector('ytd-live-chat-frame#chat').setAttribute('collapsed','')
    }

    setToggleBtnTxt()
  }

  
  globalHook('yt-page-data-updated',(evt)=>{

    if(!evt || !evt.target || evt.target.nodeType !== 1) return;

    _console.log(evt.target.nodeName,904, evt.type);



    mtc_nr_comments = Date.now();


    
    FP.mtf_attrEngagementPanel();
    
    _innerCommentsLoader();
    if(!fetched){
      window.dispatchEvent(new Event("scroll")); 
    }

    pageCheck();
    //fixChatFrameToggleButton();

    //if(document.querySelector('ytd-live-chat-frame#chat')){


    let siw=10;
    let sic=0;
    let sif = ()=>{

      let iframe = document.querySelector('ytd-live-chat-frame#chat')
      if(iframe){
        foundIframe(iframe);
        clearInterval(sic)
        sic=0;
        return;
      } 

      if(--siw===1){
        clearInterval(sic)
        sic=0;
      }
    };
    sic= setInterval(sif,46);
    sif();


    //}
    

    (async ()=>{

      
      await initializerLock;
      
      _console.log(evt.target.nodeName,905, evt.type)

      
      _console.log(2774, !!document.querySelector('ytd-live-chat-frame#chat'))

      _console.log(2344,evt.type, document.querySelector('ytd-live-chat-frame#chat')?5:2)
      
      _console.log(544, document.querySelectorAll('#meta-contents'))
      _console.log(546, document.querySelectorAll('#meta-contents ytd-expander'))
      let expander = document.querySelector('#meta-contents ytd-expander:not([tabview-info-expander])')
      if(expander){
        

        // once per $$native-info-description$$ {#meta-contents ytd-expander} detection
        // append the detailed meta contents to the tab-info

        let ytdFlexyElm = kRef(ytdFlexy);
        if (!scriptEnable || !ytdFlexyElm) return ;

        if (!expander) return ;
        expander.setAttribute('tabview-info-expander','')
        $(expander).appendTo("#tab-info").attr('data-dom-changed-by-tabview-youtube', scriptVersionForExternal)



      }
      
      mtf_fix_details();



    })();

    


  }) 


  globalHook('yt-page-data-fetched',(evt)=>{

    if(!evt || !evt.target || evt.target.nodeType !== 1) return;

    mtc_nr_comments = Date.now();

    let nodeName = evt.target.nodeName.toUpperCase()

    _console.log(nodeName,904, evt.type);
    
    

    let d_page = ((evt.detail||0).pageData||0).page;

    pageType = d_page;
    if(d_page=='watch'){
      
      document.documentElement.classList.toggle('tabview-normal-player', true)
    }else{
      document.documentElement.classList.toggle('tabview-normal-player', false)

    }

    
    dispatchWindowResize(); // player control positioning
    

    let liveChatRenderer = null;
    try {

      liveChatRenderer = evt.detail.pageData.response.contents.twoColumnWatchNextResults.conversationBar.liveChatRenderer
    } catch (e) { }
    

    chatroomDetails = liveChatRenderer?extractInfoFromLiveChatRenderer(liveChatRenderer):null;

    document.querySelector('ytd-watch-flexy').classList.toggle( 'tv-chat-toggleable', !!chatroomDetails);



    (async ()=>{
      
      await initializerLock;
      
      _console.log(nodeName,905, evt.type, evt.detail, document.querySelector('ytd-live-chat-frame#chat'));

      _console.log(2344,evt.type, document.querySelector('ytd-live-chat-frame#chat')?5:2)

      if(nodeName==='YTD-APP'){ 
        _console.log(2554, nodeName, evt.type, evt.detail )
          newVideoPage(evt.detail);
      }

    })();
    //fixChatFrameToggleButton();


  })

  globalHook('yt-watch-comments-ready',(evt)=>{
    
    if(!evt || !evt.target || evt.target.nodeType !== 1) return;

    mtc_nr_comments = Date.now();

    let nodeName = evt.target.nodeName.toUpperCase()
    _console.log(nodeName,904, evt.type, evt.detail, document.querySelector('ytd-live-chat-frame#chat'));

    
    //fetchCommentsFinished();
    
    window.dispatchEvent(new Event("scroll")); 

    pageCheck();

    (async ()=>{
      
      await initializerLock;
      _console.log(nodeName,905, evt.type, evt.detail, document.querySelector('ytd-live-chat-frame#chat'));
        

      if(nodeName==='YTD-WATCH-FLEXY'){
        
        let m_comments = document.querySelector(`ytd-comments#comments:not([o3r-${sa_comments}])`);
        if(m_comments) cssOnceFunc_comments(m_comments);



        if(mtf_forceCheckLiveVideo_disable===2){

        }else{

          

          _console.log(3713, fetched)

          if(document.querySelector(`ytd-comments#comments`).hasAttribute('hidden')){

            //unavailable apart from live chat

            _disableComments();
            
          _console.log(3713, 3)


          }else{
                    
            let innerCommentsLoaderRet = _innerCommentsLoader();
            comments_ulfx(innerCommentsLoaderRet); 
                    
          _console.log(3713, 5)



            if(fetched|| pendingFetch ){
              
          _console.log(3713, 6)
   
              // if there is only message, no rendering event occur after yt-watch-comments-ready
              timeline.setTimeout(()=>{
                  if(!fetched && pendingFetch){
                      pendingFetch.f();
                      fetched= true;
                  }
                  if(fetched){
                    fetchCommentsFinished();
                    fetched=false;pendingFetch=null;
                  }
              },800)
  
            }

          }
 
  
          _console.log(3714, fetched, !!pendingFetch)


           
         

        }
         

        

      }

    })();


  })

  function onNavigationEnd(evt) {
    console.log('yt-navigate-finish')



    globalHook('yt-navigate',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      


    })


    
    globalHook('ytd-playlist-lockup-now-playing-active',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    
    globalHook('yt-service-request-completed',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })
    globalHook('yt-commerce-action-done',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })
    globalHook('yt-navigate',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })


    globalHook('yt-execute-service-endpoint',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))


    })



    globalHook('yt-request-panel-mode-change',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    
    window.addEventListener("message", (evt) => {
      if(evt.origin === location.origin && evt.data.tabview){

        let data = evt.data.tabview;

        if(data.eventType=== "yt-page-type-changed"){
          let detail = data.eventDetail
          let {newPageType, oldPageType} = detail;
          if(newPageType && oldPageType ){

            let bool = false;
            if(newPageType == 'ytd-watch-flexy'){
              bool = true;

              pageType = 'watch';
            }else if(newPageType=='ytd-browse'){
              
              pageType = 'browse';
            }

            //if(newPageType=='ytd-browse'){

            //}
            document.documentElement.classList.toggle('tabview-normal-player', bool)
            
            dispatchWindowResize(); // player control positioning
            
          }
        }

        console.log(37192,evt)

      }
    }, bubblePassive);
/*
  document.addEventListener('yt-page-type-changed',(evt)=>{

    console.log(3553,evt,evt.detail,evt.target.data)
  },false);
*/
    
    globalHook('yt-visibility-refresh',(evt)=>{

      if(!evt || !evt.target /*|| evt.target.nodeType !== 1*/) return;
      _console.log(evt.target.nodeName||'', evt.type)

      _console.log(2784, evt.type, kRef(ytdFlexy).hasAttribute('hidden'),evt.detail)
      _console.log(evt.detail)


    })

    

    //document.addEventListener('')

    globalHook('yt-request-panel-mode-change',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))


    })
    globalHook('yt-navigate-finish',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))

      
      let m_comments = document.querySelector(`ytd-comments#comments:not([o3r-${sa_comments}])`);
      if(m_comments) cssOnceFunc_comments(m_comments);


    })

    globalHook('app-reset-layout',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))


    })
    globalHook('yt-guide-close',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)

      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))


    })
    globalHook('yt-page-data-will-change',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    globalHook('yt-retrieve-location',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })


    

    globalHook('yt-refit',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
      
      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))
    })
    globalHook('addon-attached',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
      
      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))
    })
    globalHook('yt-live-chat-context-menu-opened',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
      
      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))
    })

    globalHook('yt-live-chat-context-menu-closed',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
      
      _console.log(2774, evt.type, !!document.querySelector('ytd-live-chat-frame#chat'))
    })

    globalHook('yt-commentbox-resize',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
    })

    
    globalHook('yt-rich-grid-layout-refreshed',(evt)=>{
      
      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(2327, evt.target.nodeName, evt.type)
    })


    
    globalHook('data-changed',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      
      let nodeName = evt.target.nodeName.toUpperCase()
      _console.log(nodeName, evt.type)

      if(nodeName==='YTD-ITEM-SECTION-RENDERER' || nodeName==='YTD-COMMENTS'){

        _console.log(344)


      }
/*
      if(nodeName==='YTD-TOGGLE-BUTTON-RENDERER'){


        if(toggleBtnDC===1){
          toggleBtnDC = evt.target;

          fixChatFrameToggleButton();

          requestAnimationFrame(()=>{
  
            fixChatFrameToggleButton();
  
          })

        } 
        
      }*/


    })

    globalHook('animationend',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)
 

    })

    
    globalHook('yt-dismissible-item-dismissed',(evt)=>{

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })
    globalHook('yt-dismissible-item-undismissed',function(evt){

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    
    globalHook('yt-load-next-continuation',function(evt){

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    
    globalHook('yt-load-reload-continuation',function(evt){

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })
    

    
    globalHook('yt-toggle-button',function(evt){

      if(!evt || !evt.target || evt.target.nodeType !== 1) return;
      _console.log(evt.target.nodeName, evt.type)


    })

    document.dispatchEvent(new CustomEvent('tabview-v-change')) //possible duplicated
    
    
    document.documentElement.setAttribute('youtube-ready','')
    
    script_inject_js1.inject();
    document.documentElement.dispatchEvent(new CustomEvent('tabview-ce-hack'))

    //document.dispatchEvent(new CustomEvent('tabview-youtube-comments-check'))

    forceConfig();
    /*
    console.log(window.ytcfg)
    try{
    window.ytcfg.set({
      "EXPERIMENT_FLAGS": {"kevlar_watch_metadata_refresh":false}})
    }catch(e){}
    // ytcfg.set({EXPERIMENT_FLAGS:{"kevlar_watch_metadata_refresh":true}})
    */


    let mRet =
      (/^https?\:\/\/(\w+\.)*youtube\.com\/watch\?(\w+\=[^\/\?\&]+\&|\w+\=?\&)*v=[\w\-\_]+/.test(window.location.href) ? 1 : 0) +
      (document.querySelector('ytd-watch-flexy[tabview-selection]') ? 2 : 0);

    if (mRet === 1) {


      document.addEventListener('load',function(evt){

        if( checkEvtTarget(evt, ['IFRAME']) && evt.target.matches('body iframe.style-scope.ytd-live-chat-frame#chatframe')){

          let iframe = evt.target;
          new Promise(resolve=>{

            let k = 270
            let cid = setInterval(()=>{
              
              if(k--<1) {
                clearInterval(cid);
                resolve(false);
              }

              let cDoc = iframe.contentDocument; 
              if (!cDoc) return null;
              if (cDoc.readyState != 'complete') return;
              if (!cDoc.querySelector('body')) {
                clearInterval(cid);
                resolve(false);
              }

              if(!cDoc.querySelector('yt-live-chat-app')) return;

              clearInterval(cid);

              if(!document.contains(iframe)) return resolve(false);

              resolve(cDoc);
          


            },17)
            

          }).then((res)=>{

            if(res){
              callFind(res)
            }

          })



        }
      }, capturePassive)
 

      pluginUnhook(); // in case not triggered by popstate - say mini playing

      let timeout = 4; // max. 4 animation frames

      let tf = () => {

        if (--timeout > 0 && !document.querySelector('#player video')) return requestAnimationFrame(tf);

        let ytdFlexyElm = document.querySelector('ytd-watch-flexy')

        if(!ytdFlexyElm) return;


        scriptEnable = true;
        scriptEC++;


        ytdFlexy = mWeakRef(ytdFlexyElm)

        let timeoutR_findRelated = new Timeout();
        timeoutR_findRelated.set(function() {
          let ytdFlexyElm = kRef(ytdFlexy);
          if(!ytdFlexyElm) return true;
          let related = querySelectorFromAnchor.call(ytdFlexyElm,"#related");
          if (!related) return true;
          foundRelated(related);
        }, 100, 10)

        function foundRelated(related) {
          let promise = Promise.resolve();
          if (!document.querySelector("#right-tabs")) {
            promise = promise.then(() => {
              getLang();
              $(getTabsHTML()).insertBefore(related).attr('data-dom-created-by-tabview-youtube', scriptVersionForExternal);
            })
          }
          promise.then(runAfterTabAppended)
        }

      }

      tf();

    } else if (mRet === 3) {

      if(!scriptEnable) return;

      let elmComments = document.querySelector('ytd-comments#comments')

      if (elmComments && querySelectorFromAnchor.call(elmComments,'ytd-item-section-renderer#sections.style-scope.ytd-comments')){
        nativeFunc(elmComments, "loadComments")
      }

    } else if (mRet === 0) {
      

      pluginUnhook(); // in case not triggered by popstate - say mini playing

    }




    if(scriptEnable) {


      let m_comments = document.querySelector(`ytd-comments#comments:not([o3r-${sa_comments}])`);
      if(m_comments) cssOnceFunc_comments(m_comments);

      
      if(cid_nav_end>0) {
        clearInterval(cid_nav_end)
        cid_nav_end = 0;
      }

      rc_nav_end = 0;
      cid_nav_end=setInterval(()=>{

        if(rc_nav_end<1000) rc_nav_end++;

        // regular check for different issues with UI display status
        // until the initialization of the page finished + 4700ms


        
        let clearTimer = false;
        if(rc_nav_end<80){ // <=63s
          let cTime = Date.now();

        
          if(cTime - mtc_nr_comments<1270) return;
          if(!mtc_nr_comments || cTime - mtc_nr_comments>2870){
            clearTimer = true; // last check
          }

          
      

        }else{
          clearTimer = true;
        }
        
        if(clearTimer && cid_nav_end>0) {
          clearInterval(cid_nav_end)
          cid_nav_end = 0;
        }

      },800)


      initializerResolve();

    }

  }


  function setToActiveTab(defaultTab) {
    if (isTheater() && isWideScreenWithTwoColumns()) return;
    const jElm = document.querySelector(`a[userscript-tab-content="${switchTabActivity_lastTab}"]:not(.tab-btn-hidden)`) ||
      document.querySelector(`a[userscript-tab-content="${(defaultTab||settings.defaultTab)}"]:not(.tab-btn-hidden)`) ||
      document.querySelector("a[userscript-tab-content]:not(.tab-btn-hidden)") ||
      null;
    switchTabActivity(jElm);
    return !!jElm;
  }

  function getWrapper(wrapperId) {
    let $wrapper = $(`#${wrapperId}`);
    if (!$wrapper[0]) $wrapper = $(`<div id="${wrapperId}"></div>`)
    return $wrapper.first();
  }


  function runAfterTabAppended() {

    document.documentElement.setAttribute('plugin-tabview-youtube', '')

    const ytdFlexyElm = kRef(ytdFlexy)
    if(!ytdFlexyElm) return;
    if (!ytdFlexyElm.hasAttribute('tabview-selection')) ytdFlexyElm.setAttribute('tabview-selection', '')

    // append the next videos 
    // it exists as "related" is already here
    fixTabs();

    setToActiveTab(); // just switch to the default tab
    prepareTabBtn();


    mtoFlexyAttr.clear(true)
    mtf_checkFlexy()


    document.querySelector("#right-tabs .tab-content").addEventListener('scroll', windowScroll, true);
 


    // for automcomplete plugin or other userscript plugins
    // document.body for Firefox >= 60
    mtoMutation_body.bindElement(document.querySelector('body'), {
      childList: true,
      subtree: false,
      attributes: false
    })



    



  }


  function fetchCommentsFinished() {
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return;
    if(mtf_forceCheckLiveVideo_disable===2) return;
    akAttr(ytdFlexyElm, 'tabview-youtube-comments', false, 'LS') 
    _console.log(2909,1)
  }

  function setCommentSection( /** @type {number} */ value) {

    Q.comments_section_loaded = value;

  }


  function emptyCommentSection(){
    

    let tab_btn = document.querySelector('.tab-btn[userscript-tab-content="#tab-comments"]')


    if(tab_btn){

      let span = querySelectorFromAnchor.call(tab_btn,'span#tab3-txt-loader');

      tab_btn.removeAttribute('loaded-comment')
        
      if(span){
        span.textContent='';
      }
    }


    setCommentSection(0);


  }



  function _disableComments() {
     

    _console.log(2909,1)
    if (!scriptEnable) return;
    let cssElm = kRef(ytdFlexy);
    if (!cssElm) return;

    _console.log(2909,2)

    
    let comments = document.querySelector('ytd-comments#comments')
    if(mtf_forceCheckLiveVideo_disable===2){
      // earlier than DOM change
    }else{
      if(comments && !comments.hasAttribute('hidden')) return; // visible comments content)
    }
      
    if(Q.comments_section_loaded===2) return; //already disabled
    


    _console.log(2909,3)
    

    _console.log(2909,4) 
    setCommentSection(2);

    _console.log(2909,5) 

    let tabBtn = document.querySelector('.tab-btn[userscript-tab-content="#tab-comments"]');
    if(tabBtn) {
      let span = querySelectorFromAnchor.call(tabBtn,'span#tab3-txt-loader');
      tabBtn.removeAttribute('loaded-comment')
      if (!tabBtn.classList.contains('tab-btn-hidden')) {
        //console.log('hide', comments, comments && comments.hasAttribute('hidden'))
        hideTabBtn(tabBtn)
      }
      if(span){
        span.textContent='';
      }
    }

    akAttr(cssElm, 'tabview-youtube-comments', true, 'D');
    
    _console.log(2909,10)


  }




  let layoutStatusMutex = new Mutex();

  function forceDisplayChatReplay() {
    let items = chatFrameElement('yt-live-chat-item-list-renderer #items');
    if (items && items.childElementCount !== 0) return;

    let ytd_player = document.querySelector('ytd-player#ytd-player');
    if (!ytd_player) return;
    let videoElm = querySelectorFromAnchor.call(ytd_player,'video');
    if (!videoElm) return;

    let video = videoElm;
    if (videoElm && video.currentTime > 0 && !video.ended && video.readyState > video.HAVE_CURRENT_DATA) {
      let chat = document.querySelector('ytd-live-chat-frame#chat');
      if (chat) {
        nativeFunc(chat, "postToContentWindow", [{ "yt-player-video-progress": videoElm.currentTime }])
      }
    }

  }



  function addIframeStyle(cDoc){


    
    if(cDoc.querySelector('#userscript-tabview-chatroom-css')) return false; 

    addStyle(`     


    body #input-panel.yt-live-chat-renderer::after {
         background: transparent;
    }
     .style-scope.yt-live-chat-item-list-renderer{
         box-sizing: border-box;
     }
 
     yt-live-chat-text-message-renderer:nth-last-child(-n+30):hover #menu.yt-live-chat-text-message-renderer{
         transition-delay: 87ms;
    }
 
     yt-live-chat-text-message-renderer #menu.yt-live-chat-text-message-renderer{
         transition-delay: 1ms;
    }
 
     #item.style-scope.yt-live-chat-item-list-renderer, #item-scroller.style-scope.yt-live-chat-item-list-renderer{
         transition-delay: 42ms;
    }
 
     yt-live-chat-item-list-renderer img[alt] {
         pointer-events: auto;
    }
 
     body yt-live-chat-item-list-renderer img[alt] ~ tp-yt-paper-tooltip, body yt-live-chat-item-list-renderer #image ~ tp-yt-paper-tooltip {
         --paper-tooltip-delay-in: 120ms !important;
         white-space: nowrap;
    }
 
    #items.style-scope.yt-live-chat-item-list-renderer > yt-live-chat-text-message-renderer.yt-live-chat-item-list-renderer{
      --tabview-chat-message-display: block;
      --tabview-chat-message-mt: 2px;
      --tabview-chat-message-mb: 4px;
    }
 
    #message.yt-live-chat-text-message-renderer {
     display: var(--tabview-chat-message-display);
     margin-top: var(--tabview-chat-message-mt);
     margin-bottom: var(--tabview-chat-message-mb);
   }
 
   [collapsed] #message.yt-live-chat-text-message-renderer{
     --tabview-chat-message-display: 'VOID';
     --tabview-chat-message-mt: 'VOID';
     --tabview-chat-message-mb: 'VOID';
   }
 
 
 
 
    @supports (contain: layout paint style){
 
     
     body yt-live-chat-app{
           contain: size layout paint style;
           content-visibility: auto;
           transform: translate3d(0,0,0);
           overflow: hidden;
     }
 
 
     #items.style-scope.yt-live-chat-item-list-renderer, 
     #item-offset.style-scope.yt-live-chat-item-list-renderer {      
       contain: layout paint style;      
     }
 
     #item-scroller.style-scope.yt-live-chat-item-list-renderer{
       contain: size style;
     }
 
     #contents.style-scope.yt-live-chat-item-list-renderer, 
     #chat.style-scope.yt-live-chat-renderer, 
     img.style-scope.yt-img-shadow[width][height]{
         contain: size layout paint style;
    }
      
         .style-scope.yt-live-chat-ticker-renderer[role="button"][aria-label], 
         .style-scope.yt-live-chat-ticker-renderer[role="button"][aria-label] > #container {
             contain: layout paint style;
        }
 
 
        yt-img-shadow#author-photo.style-scope{
            contain: layout paint style;
            content-visibility: auto;
            contain-intrinsic-size: 24px 24px;
       }
 
         yt-live-chat-text-message-renderer:not([author-is-owner]) #author-photo.style-scope.yt-live-chat-text-message-renderer, yt-live-chat-text-message-renderer:not([author-is-owner]) yt-live-chat-author-chip.style-scope.yt-live-chat-text-message-renderer{
             pointer-events: none;
        }
 
         yt-live-chat-text-message-renderer:not([author-is-owner]) span#message.style-scope.yt-live-chat-text-message-renderer > img.emoji.yt-formatted-string.style-scope.yt-live-chat-text-message-renderer {
             cursor: default;
        }
 
        
        yt-live-chat-text-message-renderer:not([author-is-owner]) span#message.style-scope.yt-live-chat-text-message-renderer, 
        yt-live-chat-paid-message-renderer #message.yt-live-chat-paid-message-renderer,
         yt-live-chat-text-message-renderer:not([author-is-owner]) #timestamp.style-scope.yt-live-chat-text-message-renderer, 
         yt-live-chat-membership-item-renderer #header-content.style-scope.yt-live-chat-membership-item-renderer, 
         yt-live-chat-membership-item-renderer #timestamp.style-scope.yt-live-chat-membership-item-renderer, 
         yt-live-chat-paid-message-renderer #header-content.yt-live-chat-paid-message-renderer, 
         yt-live-chat-paid-message-renderer #timestamp.style-scope.yt-live-chat-paid-message-renderer, 
         yt-live-chat-paid-sticker-renderer #content.style-scope.yt-live-chat-paid-sticker-renderer, 
         yt-live-chat-paid-sticker-renderer #timestamp.style-scope.yt-live-chat-paid-sticker-renderer {
             cursor: default;
             pointer-events: none;
        }
 
         yt-live-chat-text-message-renderer.style-scope.yt-live-chat-item-list-renderer, 
         yt-live-chat-membership-item-renderer.style-scope.yt-live-chat-item-list-renderer, 
         yt-live-chat-paid-message-renderer.style-scope.yt-live-chat-item-list-renderer,
         yt-live-chat-banner-manager.style-scope.yt-live-chat-item-list-renderer {
             contain: layout style;
        }
 
         tp-yt-paper-tooltip[style*="inset"][role="tooltip"] {
             contain: layout paint style;
        }
             
 
    }
 
 
    #chat-messages tp-yt-iron-dropdown#dropdown.style-scope.tp-yt-paper-menu-button{
      margin-right: var(--ytd-margin-12x);
    }
 
     
             `, cDoc.documentElement).id='userscript-tabview-chatroom-css'

             return true;

  }

  let _last_iframe = null;

  function callFind(cDoc){

    _last_iframe = cDoc;
    if(!cDoc)return;

    if(addIframeStyle(cDoc)===false)return;

    let frc= 0;
    let cid = 0;
    
    let fullReady = ()=>{
      
      if(!cDoc.documentElement.hasAttribute('style') && ++frc<900) return;
      clearInterval(cid);
      
      if (!scriptEnable || !isChatExpand()) return;

      let iframe = document.querySelector('ytd-live-chat-frame iframe#chatframe');

      if(!document.contains(iframe)) return;

      if (cDoc.querySelector('yt-live-chat-renderer #continuations')) { 
        $(document.querySelector('ytd-live-chat-frame#chat')).attr('yt-userscript-iframe-loaded', '')
      }

      forceDisplayChatReplay();
      iframe.dispatchEvent(new CustomEvent("tabview-chatroom-ready"))

    }
    cid = setInterval(fullReady,10)
    fullReady();
    



    
  }

  function flexyAttr_toggleFlag(mFlag, b, flag) {
    return b ? (mFlag | flag) : (mFlag & ~flag) ;
  }

  function flexAttr_toLayoutStatus(nls, attributeName) {

    let attrElm, b, v;
    switch (attributeName) {
      case 'theater':
        b = isTheater();
        nls = flexyAttr_toggleFlag(nls, b, LAYOUT_THEATER);
        break;
      case 'userscript-chat-collapsed':
      case 'userscript-chatblock':
        attrElm = kRef(ytdFlexy);
        if (hasAttribute(attrElm, 'userscript-chat-collapsed')) {
          nls = flexyAttr_toggleFlag(nls, true, LAYOUT_CHATROOM | LAYOUT_CHATROOM_COLLAPSED);
        } else {
          nls = flexyAttr_toggleFlag(nls, hasAttribute(attrElm, 'userscript-chatblock'), LAYOUT_CHATROOM);
          nls = flexyAttr_toggleFlag(nls, false, LAYOUT_CHATROOM_COLLAPSED);
        }
        break;
      case 'is-two-columns_':
        b = isWideScreenWithTwoColumns();
        nls = flexyAttr_toggleFlag(nls, b, LAYOUT_TWO_COLUMNS);
        break;

      case 'tabview-selection':
        attrElm = kRef(ytdFlexy);
        b = isNonEmptyString(attrElm.getAttribute('tabview-selection'));
        nls = flexyAttr_toggleFlag(nls, b, LAYOUT_TAB_EXPANDED);
        break;

      case 'fullscreen':
        attrElm = kRef(ytdFlexy);
        b = attrElm.hasAttribute('fullscreen');
        nls = flexyAttr_toggleFlag(nls, b, LAYOUT_FULLSCREEN);
        break;

      case 'userscript-engagement-panel':
        attrElm = kRef(ytdFlexy);
        v = attrElm.getAttribute('userscript-engagement-panel');
        b = (+v > 0)
        nls = flexyAttr_toggleFlag(nls, b, LAYOUT_ENGAGEMENT_PANEL_EXPAND);
        break;

    }

    return nls;


  }

  let mtf_attrFlexy = (mutations, observer) => {

    //attr mutation checker - $$ytdFlexyElm$$ {ytd-watch-flexy} \single
    //::attr    
    // ~ 'userscript-chat-collapsed', 'userscript-chatblock', 'theater', 'is-two-columns_', 
    // ~ 'tabview-selection', 'fullscreen', 'userscript-engagement-panel', 
    // ~ 'hidden'

    //console.log(15330, scriptEnable, kRef(ytdFlexy), mutations)

    if (!scriptEnable) return;

    const cssElm = kRef(ytdFlexy)
    if (!cssElm) return;

    if (!mutations) return;

    
    


    const old_layoutStatus = wls.layoutStatus
    if (old_layoutStatus === 0) return;
    let new_layoutStatus = old_layoutStatus;

    let checkedChat = false;

    for (const mutation of mutations) {
      new_layoutStatus = flexAttr_toLayoutStatus(new_layoutStatus, mutation.attributeName);
      if (mutation.attributeName == 'userscript-chat-collapsed' || mutation.attributeName == 'userscript-chatblock') {

        if(!checkedChat){
          checkedChat = true; // avoid double call

          if (cssElm.getAttribute('userscript-chatblock') === 'chat-live') {
            // assigned new attribute - "chat-live" => disable comments section
            
            _disableComments();
          }

          if (!cssElm.hasAttribute('userscript-chatblock')) {
            // might or might not collapsed before
            timeline.setTimeout(() => {
              if (!scriptEnable) return;
              //delayed call => check with the "no active focus" condition with chatroom status
              if (!isAnyActiveTab() && !isChatExpand() && !isTheater() && isWideScreenWithTwoColumns() && !isFullScreen()) {
                setToActiveTab();
              }
            }, 240);
          }
        }

      }else if(mutation.attributeName == 'userscript-engagement-panel'){
        // assume any other active component such as tab content and chatroom
        
        if (+(cssElm.getAttribute('userscript-engagement-panel')||0)===0 && +mutation.oldValue>0) {
          timeline.setTimeout(() => {
            if (!scriptEnable) return;
            //delayed call => check with the "no active focus" condition with engagement panel status
            if (!isAnyActiveTab() && !isEngagementPanelExpanded() && !isTheater() && isWideScreenWithTwoColumns() && !isFullScreen() && !isChatExpand()) {
              setToActiveTab();
            }
          }, 240);
        }
      }
    }

    new_layoutStatus = fixLayoutStatus(new_layoutStatus);


    if (new_layoutStatus !== old_layoutStatus) {
      wls.layoutStatus = new_layoutStatus

      // resize => is-two-columns_
      if (((new_layoutStatus ^ old_layoutStatus) & LAYOUT_TWO_COLUMNS) === LAYOUT_TWO_COLUMNS) {
        requestAnimationFrame(() => {
          pageCheck();
          singleColumnScrolling(true); //initalize sticky
        })
      }

    } 

  }

  const mtf_checkFlexy = () => {
    // once per $$native-ytd-watch-flexy$$ {ytd-watch-flexy} detection

    let ytdFlexyElm = kRef(ytdFlexy);
    if (!scriptEnable || !ytdFlexyElm) return true;


    wls.layoutStatus = 0;

    let isFlexyHidden = (ytdFlexyElm.hasAttribute('hidden'));

    if (!isFlexyHidden) {
      let rChatExist = base_ChatExist();
      if (rChatExist) {
        let { attr_chatblock, attr_chatcollapsed } = rChatExist;
        if (attr_chatblock === null) {
          //remove attribute if it is unknown
          attr_chatblock = false;
          attr_chatcollapsed = false;
        }
        wAttr(ytdFlexyElm, 'userscript-chatblock', attr_chatblock)
        
        _console.log(322,ytdFlexyElm.hasAttribute('userscript-chatblock'))
        wAttr(ytdFlexyElm, 'userscript-chat-collapsed', attr_chatcollapsed)
      }
    }

    let rTabSelection = [...querySelectorAllFromAnchor.call(ytdFlexyElm,'.tab-btn[userscript-tab-content]')]
      .map(elm => ({ elm, hidden: elm.classList.contains('tab-btn-hidden') }));

    if(rTabSelection.length === 0){
      wAttr(ytdFlexyElm, 'tabview-selection', false);
    }else{
      rTabSelection=rTabSelection.filter(entry => entry.hidden !== true); // all available tabs
      if (rTabSelection.length === 0) wAttr(ytdFlexyElm, 'tabview-selection', '');
    }
    rTabSelection = null;
      
    let rEP = engagement_panels_();
    if (rEP && rEP.count > 0) wAttr(ytdFlexyElm, 'userscript-engagement-panel', false);
    //else wAttr(ytdFlexyElm, 'userscript-engagement-panel', rEP.value + ""); // can be 0
    else if(rEP.value>0) wAttr(ytdFlexyElm, 'userscript-engagement-panel', rEP.value + ""); // can be 0

    let ls = LAYOUT_VAILD;
    ls = flexAttr_toLayoutStatus(ls, 'theater')
    ls = flexAttr_toLayoutStatus(ls, 'userscript-chat-collapsed')
    ls = flexAttr_toLayoutStatus(ls, 'userscript-chatblock')
    ls = flexAttr_toLayoutStatus(ls, 'is-two-columns_')
    ls = flexAttr_toLayoutStatus(ls, 'tabview-selection')
    ls = flexAttr_toLayoutStatus(ls, 'fullscreen')
    ls = flexAttr_toLayoutStatus(ls, 'userscript-engagement-panel')

    fixLayoutStatus(ls)


    wls.layoutStatus = ls

    mtoFlexyAttr.bindElement(ytdFlexyElm,{
      attributes: true,
      attributeFilter: ['userscript-chat-collapsed', 'userscript-chatblock', 'theater', 'is-two-columns_', 'tabview-selection', 'fullscreen', 'userscript-engagement-panel', 'hidden'],
      attributeOldValue: true
    })



    let columns = document.querySelector('ytd-page-manager#page-manager #columns')
    if (columns) {
      wAttr(columns, 'userscript-scrollbar-render', true);
    }

    return false;
  }
  

  function checkVisibleEngagementPanel(){
    
    if(storeLastPanel){

      let elm_storeLastPanel = kRef(storeLastPanel);

      if(elm_storeLastPanel && !isDOMVisible(elm_storeLastPanel) ){
        storeLastPanel=null;
        ytBtnCloseEngagementPanels();
      }

    }

  }

 



  let switchTabActivity_lastTab = null

  function setDisplayedPlaylist() {
    //override the default youtube coding event prevention
    let cssElm = kRef(ytdFlexy);
    if (!scriptEnable || !cssElm) return;
    displayedPlaylist = mWeakRef(document.querySelector('ytd-watch-flexy #tab-list:not(.tab-content-hidden) ytd-playlist-panel-renderer[tabview-true-playlist]') || null);
  }


  

  function switchTabActivity(activeLink) {
    if (!scriptEnable) return;

    const ytdFlexyElm = kRef(ytdFlexy);

    if (!ytdFlexyElm) return;

    if (activeLink && activeLink.classList.contains('tab-btn-hidden')) return; // not allow to switch to hide tab

    //if (isTheater() && isWideScreenWithTwoColumns()) activeLink = null;


    function runAtEnd() {

      
    //console.log(12312)

      if (activeLink) {
        lstTab.lastTab = activeLink.getAttribute('userscript-tab-content')
        lstTab.lastPanel = null;
      }

      displayedPlaylist = null;
      scrollingVideosList = null;

      if (activeLink && lstTab.lastTab == '#tab-list') {
        setDisplayedPlaylist();
      } else if (activeLink && lstTab.lastTab == '#tab-videos') {
        scrollingVideosList = mWeakRef(document.querySelector('ytd-watch-flexy #tab-videos:not(.tab-content-hidden) [placeholder-videos]'));
      }


      ytdFlexyElm.setAttribute('tabview-selection', activeLink ? lstTab.lastTab : '')

      if (activeLink && lstTab.lastTab == '#tab-comments' && (ytdFlexyElm.getAttribute('tabview-youtube-comments') || '').lastIndexOf('S') >= 0) {

        
        if(mtf_forceCheckLiveVideo_disable===2) {}
        else{
          akAttr(ytdFlexyElm, 'tabview-youtube-comments', false, 'L');
          
    _console.log(2909,3)

        }

      }



    }

    const links = document.querySelectorAll('#material-tabs a[userscript-tab-content]');

    //console.log(701, activeLink)

    for (const link of links) {
      let content = document.querySelector(link.getAttribute('userscript-tab-content'));
      if (link && content) {
        if (link !== activeLink) {
          link.classList.remove("active");
          content.classList.add("tab-content-hidden");
        } else {
          //console.log(3343)
          link.classList.add("active");
          content.classList.remove("tab-content-hidden");
          //timeline.setTimeout(()=>content.focus(),400);

        }
      }
    }

    runAtEnd();


  }


  const STORE_VERSION = 1;
  const STORE_key = 'userscript-tabview-settings';
  function getStore(){
    let s = localStorage[STORE_key];
    function resetStore(){
      let ret = {
        version: 1,
      };
      localStorage[STORE_key]=JSON.stringify(ret);
      return ret;
    }
    if(!s) return resetStore();
    let obj = null;
    try{
      obj = JSON.parse(s);
    }catch(e){}
    return obj && obj.version === STORE_VERSION ? obj : resetStore();
  }

  function setStore(obj){
    if(!obj || typeof obj !=='object') return false;
    if(obj.version !== STORE_VERSION) return false;
    localStorage[STORE_key]=JSON.stringify(obj);
    return true;
  }

  let tabsUiScript_setclick = false;

  function prepareTabBtn() {

    const materialTab = document.querySelector("#material-tabs")
    if (!materialTab) return;

    let noActiveTab = !!document.querySelector('ytd-watch-flexy[userscript-chatblock]:not([userscript-chat-collapsed])')

    const activeLink = querySelectorFromAnchor.call(materialTab,'a[userscript-tab-content].active:not(.tab-btn-hidden)')
    if (activeLink) switchTabActivity(noActiveTab ? null : activeLink)

    if (!tabsUiScript_setclick) {
      tabsUiScript_setclick = true;
      $(materialTab).on("click", "a", function(evt) {

        //console.log(8510)
        let ytdFlexyElm = kRef(ytdFlexy);
        if (!scriptEnable || !ytdFlexyElm) return null;

        if (!this.hasAttribute('userscript-tab-content')) return;

        if (evt.target.matches('.font-size-btn')) return;


        evt.preventDefault();

        //console.log(8511)
 

        //console.log(8513)
        new Promise(requestAnimationFrame).then(() => {


          //console.log(8514)
          layoutStatusMutex.lockWith(unlock => {

            //console.log(8515)
            switchTabActivity_lastTab = this.getAttribute('userscript-tab-content');

            let isActiveAndVisible = this.classList.contains('tab-btn') && this.classList.contains('active') && !this.classList.contains('tab-btn-hidden')

            if( isFullScreen() ){

              console.log(isActiveAndVisible, this)
              if(isActiveAndVisible){
                timeline.setTimeout(unlock, 80);
                switchTabActivity(null);
              }else{

                if (isChatExpand() && isWideScreenWithTwoColumns()) {
                  ytBtnCollapseChat();
                } else if (isEngagementPanelExpanded() && isWideScreenWithTwoColumns()) {
                  ytBtnCloseEngagementPanels();
                } 


                timeline.setTimeout(() => {
                  let scrollElement = document.querySelector('ytd-app[scrolling]')
                  if(!scrollElement) return;
                  // single column view; click button; scroll to tab content area 100%
                  let rightTabs = document.querySelector('#right-tabs');
                  let pTop = rightTabs.getBoundingClientRect().top - scrollElement.getBoundingClientRect().top
                  if (rightTabs && pTop > 0 && this.classList.contains('active')) { 
                    rightTabs.scrollIntoView(true);
                  }
                }, 60)

                timeline.setTimeout(unlock, 80);
                switchTabActivity(this)
              }

              
            } else if (isWideScreenWithTwoColumns() && !isTheater() && isActiveAndVisible) {
              //optional
              timeline.setTimeout(unlock, 80);
              switchTabActivity(null);
              ytBtnSetTheater();
            } else if (isActiveAndVisible) {
              timeline.setTimeout(unlock, 80);
              switchTabActivity(null);
            } else {

              if (isChatExpand() && isWideScreenWithTwoColumns()) {
                ytBtnCollapseChat();
              } else if (isEngagementPanelExpanded() && isWideScreenWithTwoColumns()) {
                ytBtnCloseEngagementPanels();
              } else if (isWideScreenWithTwoColumns() && isTheater() && !isFullScreen()) {
                ytBtnCancelTheater();
              }

              timeline.setTimeout(() => {
                // single column view; click button; scroll to tab content area 100%
                let rightTabs = document.querySelector('#right-tabs');
                if (!isWideScreenWithTwoColumns() && rightTabs && rightTabs.offsetTop > 0 && this.classList.contains('active')) {
                  let tabButtonBar = document.querySelector('#material-tabs');
                  let tabButtonBarHeight = tabButtonBar ? tabButtonBar.offsetHeight : 0;
                  window.scrollTo(0, rightTabs.offsetTop - tabButtonBarHeight);
                }
              }, 60)
              // _console.log(8519)

              timeline.setTimeout(unlock, 80)
              switchTabActivity(this)

              

            }


          })

        })




      }); 

      function updateCSS_fontsize(){

        let store = getStore();
        
        let ytdFlexyElm = kRef(ytdFlexy);
        if(ytdFlexyElm){
          if(store['font-size-#tab-info']) ytdFlexyElm.style.setProperty('--ut2257-info', store['font-size-#tab-info'])
          if(store['font-size-#tab-comments']) ytdFlexyElm.style.setProperty('--ut2257-comments', store['font-size-#tab-comments'])
          if(store['font-size-#tab-videos']) ytdFlexyElm.style.setProperty('--ut2257-videos', store['font-size-#tab-videos'])
          if(store['font-size-#tab-list']) ytdFlexyElm.style.setProperty('--ut2257-list', store['font-size-#tab-list'])
        }

      }

      $(materialTab).on("click", ".font-size-btn", function(evt){

        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        let value = evt.target.matches('.font-size-plus')?1: evt.target.matches('.font-size-minus')?-1 :0;

        let active_tab_content = closestDOM.call(evt.target,'[userscript-tab-content]').getAttribute('userscript-tab-content'); 

        let store = getStore();
        let settingKey = `font-size-${active_tab_content}`
        if(!store[settingKey]) store[settingKey] = 1.0;
        if(value<0) store[settingKey] -= 0.05;
        else if(value>0) store[settingKey] += 0.05;
        if(store[settingKey]<0.1) store[settingKey] = 0.1;
        else if(store[settingKey]>10) store[settingKey] = 10.0;
        setStore(store);


        updateCSS_fontsize();


        //console.log(this.textContent)


      });

      updateCSS_fontsize();



    }

  }


  // ---------------------------------------------------------------------------------------------
  document.addEventListener("yt-navigate-finish", onNavigationEnd, bubblePassive)
  //yt-navigate-redirect
  //"yt-page-data-fetched"
  //yt-navigate-error
  //yt-navigate-start
  //yt-page-manager-navigate-start
  //"yt-navigate"
  //"yt-navigate-cache

  document.addEventListener("yt-navigate-cache",()=>{
    console.log('yt-navigate-cache')
  },bubblePassive)
  document.addEventListener("yt-navigate-redirect",()=>{
    console.log('yt-navigate-redirect')



    script_inject_js1.inject();

    
  },bubblePassive)

  function onReady(){
    //might be earlier than yt-navigation-finish
    console.log('html-onReady')
    if(location.pathname=='/watch') script_inject_js1.inject();
  }

  if(document.readyState!=='loading'){
    onReady();
  }else{
    document.addEventListener('DOMContentLoaded', onReady, bubblePassive)
  }

  function forceConfig(){
    
    
    
  }

  document.addEventListener("yt-navigate-start",()=>{
    console.log('yt-navigate-start') // not always trigger before navigate-end
    

    script_inject_js1.inject();
    forceConfig();
  },bubblePassive)

  document.addEventListener("yt-page-manager-navigate-start",()=>{
    console.log('yt-page-manager-navigate-start')
    forceConfig();
  },bubblePassive)



  // ---------------------------------------------------------------------------------------------

  let scrolling_lastD = 0;

  const singleColumnScrolling = function(/** @type {boolean} */ scrolling_lastF) {
    
    if (!scriptEnable || pageType!=='watch') return;

    let pageY = 0;

    if(scrolling_lastD === 0){
      if( (wls.layoutStatus & LAYOUT_TWO_COLUMNS) === LAYOUT_TWO_COLUMNS){
        return;
      }
      pageY = scrollY;
      if (pageY < 10 && !scrolling_lastF) return;
    }else{
      pageY = scrollY;
    }

    let targetElm, header, navElm;
    

    _console.log(7891,'scrolling')

    Promise.resolve().then(() => {

      targetElm = document.querySelector("#right-tabs");
      if (!targetElm) return;
      header = querySelectorFromAnchor.call(targetElm,"header");
      if (!header) return;
      navElm = document.querySelector('#masthead-container, #masthead')
      if (!navElm) return;
      let navHeight = navElm ? navElm.offsetHeight : 0

      let elmY = targetElm.offsetTop

      let xyz = [elmY + navHeight, pageY, elmY - navHeight]

      let xyStatus = 0
      if (xyz[1] < xyz[2] && xyz[2] < xyz[0]) {
        // 1
        xyStatus = 1
      }

      if (xyz[0] > xyz[1] && xyz[1] > xyz[2]) {

        //2
        xyStatus = 2

      }

      if (xyz[2] < xyz[0] && xyz[0] < xyz[1]) {
        // 3

        xyStatus = 3


      }

      return xyStatus;

    }).then((xyStatus) => {

      if ((xyStatus == 2 || xyStatus == 3) && (scrolling_lastD === 0 || scrolling_lastF)) {
        scrolling_lastD = 1;
        let {
          offsetHeight
        } = header
        let {
          offsetWidth
        } = targetElm

        targetElm.style.setProperty("--userscript-sticky-width", offsetWidth + 'px')
        targetElm.style.setProperty("--userscript-sticky", offsetHeight + 'px')

        wAttr(targetElm, 'userscript-sticky', true);

      } else if ((xyStatus == 1) && (scrolling_lastD === 1 || scrolling_lastF)) {
        scrolling_lastD = 0;

        wAttr(targetElm, 'userscript-sticky', false);
      }


      targetElm = null;
      header = null;
      navElm = null;

    });

  };

  window.addEventListener("scroll", function() {
    singleColumnScrolling(false)
  }, bubblePassive)

  //let lastResizeAt = 0;
  window.addEventListener('resize', function() {

    if (!scriptEnable) return;
    if (pageType!=='watch') return;
    //lastResizeAt = Date.now();

    if((wls.layoutStatus & LAYOUT_TWO_COLUMNS) !== LAYOUT_TWO_COLUMNS){

      requestAnimationFrame(() => {
        singleColumnScrolling(true)
      })

    }


  }, bubblePassive)



  function resetBuggyLayoutForNewVideoPage() {

    
    let ytdFlexyElm = kRef(ytdFlexy);
    if (!ytdFlexyElm) return;

    //(flexy is visible and watch video page) 

    scriptEnable = true;

    //mtf_forceCheckLiveVideo_disable = 0;
    _console.log(27056)


    let new_layoutStatus = wls.layoutStatus

    new_layoutStatus & (LAYOUT_CHATROOM_COLLAPSED | LAYOUT_CHATROOM)

    const new_isExpandedChat = !(new_layoutStatus & LAYOUT_CHATROOM_COLLAPSED) && !!(new_layoutStatus & LAYOUT_CHATROOM)
    const new_isCollapsedChat = !!(new_layoutStatus & LAYOUT_CHATROOM_COLLAPSED) && !!(new_layoutStatus & LAYOUT_CHATROOM)

    const new_isTwoColumns = new_layoutStatus & LAYOUT_TWO_COLUMNS;
    const new_isTheater = new_layoutStatus & LAYOUT_THEATER;
    const new_isTabExpanded = new_layoutStatus & LAYOUT_TAB_EXPANDED;
    const new_isFullScreen = new_layoutStatus & LAYOUT_FULLSCREEN;
    const new_isExpandEPanel = new_layoutStatus & LAYOUT_ENGAGEMENT_PANEL_EXPAND;

    if (ytdFlexyElm.getAttribute('tabview-selection') === '' && new_isTwoColumns && !new_isTheater && !new_isTabExpanded && !new_isFullScreen && !new_isExpandEPanel && !new_isExpandedChat) {
      // e.g. engage panel removed after miniview and change video
      setToActiveTab();
    } else if (new_isExpandEPanel && querySelectorAllFromAnchor.call(ytdFlexyElm, 'ytd-engagement-panel-section-list-renderer[visibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]').length === 0) {
      wls.layoutStatus = new_layoutStatus & (~LAYOUT_ENGAGEMENT_PANEL_EXPAND)
    }




  }

  
  function extractInfoFromLiveChatRenderer(liveChatRenderer){

    let lcr = liveChatRenderer

    let data_shb = ((lcr||0).showHideButton||0).toggleButtonRenderer

    let default_display_state=null, txt_collapse=null, txt_expand=null;

    
    if(data_shb && data_shb.defaultText&&data_shb.toggledText&&data_shb.defaultText.runs&&data_shb.toggledText.runs){

      if(data_shb.defaultText.runs.length===1&&data_shb.toggledText.runs.length===1){

        if(lcr.initialDisplayState== "LIVE_CHAT_DISPLAY_STATE_EXPANDED"){

          default_display_state = lcr.initialDisplayState
            
          txt_collapse=(data_shb.defaultText.runs[0]||0).text // COLLAPSE the area

          txt_expand=(data_shb.toggledText.runs[0]||0).text  // expand the area

        }else if(lcr.initialDisplayState =="LIVE_CHAT_DISPLAY_STATE_COLLAPSED"){
          default_display_state = lcr.initialDisplayState

          txt_expand=(data_shb.defaultText.runs[0]||0).text  // expand the area

          txt_collapse=(data_shb.toggledText.runs[0]||0).text // COLLAPSE the area
        }



        if(typeof txt_expand=='string' && typeof txt_collapse=='string' && txt_expand.length>0 && txt_collapse.length>0){

        }else{
          txt_expand=null;
          txt_collapse=null;
        }
      }

    }

    return {default_display_state, txt_collapse, txt_expand}

  }

 // function fixChatFrameToggleButton(){
    /*
return;
    if(toggleBtnDC>0) return;
    if(!toggleBtnDC) return;
    if(!chatroomDetails) return;
    
    let {
      txt_collapse,
      txt_expand
    } = chatroomDetails;

    _console.log(933,1)
*/
    /*

    _console.log(933,1 );
        
    // fix default display state
    if(initialDisplayState==='LIVE_CHAT_DISPLAY_STATE_EXPANDED'){
      let p = document.querySelector('ytd-live-chat-frame#chat[collapsed]');
      if(p) p.removeAttribute('collapsed')

    }else if(initialDisplayState==='LIVE_CHAT_DISPLAY_STATE_COLLAPSED'){
      let p = document.querySelector('ytd-live-chat-frame#chat:not([collapsed])');
      if(p) p.setAttribute('collapsed','')
    }

    _console.log(933,2);

  let chatroomBtn = document.querySelector('ytd-live-chat-frame#chat #show-hide-button.ytd-live-chat-frame')

  if(chatroomBtn){

    _console.log(933,3 );
    let textElm = querySelectorFromAnchor.call(chatroomBtn, 'ytd-toggle-button-renderer span.yt-core-attributed-string[role="text"]')

    if(textElm){


      _console.log(933,4, txt_expand, txt_collapse );
      // fix default display state
      if(initialDisplayState==='LIVE_CHAT_DISPLAY_STATE_EXPANDED'){
        textElm.textContent = txt_collapse

      }else if(initialDisplayState==='LIVE_CHAT_DISPLAY_STATE_COLLAPSED'){
        textElm.textContent = txt_expand
      }

    }

    
  }
  */

/*

  let chatroomBtn = document.querySelector('ytd-live-chat-frame#chat #show-hide-button.ytd-live-chat-frame')

  if(chatroomBtn){
 
    _console.log(933,2)
    let textElm = querySelectorFromAnchor.call(chatroomBtn, 'ytd-toggle-button-renderer span.yt-core-attributed-string[role="text"]')

    if(textElm){

      _console.log(933,3)

      //_console.log(933,4, textElm.textContent, txt_expand, txt_collapse, document.querySelector('ytd-live-chat-frame#chat').hasAttribute('collapsed') );
      // fix default display state
      let p = document.querySelector('ytd-live-chat-frame#chat') 
      if(p){

        let iscollapsed = p.hasAttribute('collapsed')
        if(!iscollapsed && textElm.textContent !== txt_collapse){
          textElm.textContent = txt_collapse
          toggleBtnDC.dispatchEvent(new CustomEvent("tabview-button-toggle"))
          toggleBtnDC= 2;
        }else if(iscollapsed && textElm.textContent !== txt_expand){
          textElm.textContent = txt_expand
          toggleBtnDC.dispatchEvent(new CustomEvent("tabview-button-toggle"))
          toggleBtnDC=2;
        }

      }

    }

    
  }*/

 // }

  function newVideoPage(evt_detail) {

    //toggleBtnDC = 1;

    console.log('newVideoPage')
    pendingFetch = null
    fetched = false;

    document.dispatchEvent(new CustomEvent('tabview-v-change')) //possible duplicated



    //console.log('newVideoPage-', 150, location.href)

    let ytdFlexyElm = kRef(ytdFlexy);
    if (!ytdFlexyElm) return;


    timeline.reset();
    layoutStatusMutex = new Mutex();

    //console.log('newVideoPage-', 350, location.href)


    if (pageType === 'watch') {
      resetBuggyLayoutForNewVideoPage();

    }






    pendingFetch = null;
    _innerCommentsLoader();
    if (!fetched) {
      window.dispatchEvent(new Event("scroll"));
    }

    let liveChatRenderer = null;
    let isReplay = null;
    try {

      liveChatRenderer = evt_detail.pageData.response.contents.twoColumnWatchNextResults.conversationBar.liveChatRenderer
    } catch (e) { }
    if (liveChatRenderer) {

      if (liveChatRenderer.isReplay === true) isReplay = true;
    }

    const chatBlockR = liveChatRenderer ? (isReplay ? 3 : 1) : 0
    const initialDisplayState = liveChatRenderer ? liveChatRenderer.initialDisplayState : null;






    let f = () => {

      _console.log(932, 1, 1)
      let ytdFlexyElm = kRef(ytdFlexy);
      if (!scriptEnable || !ytdFlexyElm) return;

      _console.log(932, 1, 2)
      if (pageType !== 'watch') return;

      _console.log(932, 1, 3)




      let attr_chatblock = chatBlockR === 1 ? 'chat-live' : chatBlockR === 3 ? 'chat-playback' : false;
      let attr_chatcollapsed = false;

      if(attr_chatblock){
        let p = document.querySelector('ytd-live-chat-frame#chat')
        if(p){
          attr_chatcollapsed = p.hasAttribute('collapsed'); 
          if(!attr_chatcollapsed){

            //nativeFunc(p,'setupPlayerProgressRelay')
            //if(!p.isFrameReady)
            //nativeFunc(p, "urlChanged")
            //console.log(12399,1)
            p.dispatchEvent(new CustomEvent("tabview-chatroom-newpage")); //possible empty iframe is shown

          }
        }else{
          attr_chatcollapsed = initialDisplayState === 'LIVE_CHAT_DISPLAY_STATE_COLLAPSED' ? true : false;
        }
      }
 



      let chatTypeChanged = Q.mtf_chatBlockQ !== chatBlockR

      if (chatTypeChanged) {
        Q.mtf_chatBlockQ = chatBlockR



        _console.log(932, 2, attr_chatblock, attr_chatcollapsed)

        //LIVE_CHAT_DISPLAY_STATE_COLLAPSED
        //LIVE_CHAT_DISPLAY_STATE_EXPANDED
        wAttr(ytdFlexyElm, 'userscript-chatblock', attr_chatblock)
        wAttr(ytdFlexyElm, 'userscript-chat-collapsed', attr_chatcollapsed)

        _console.log(932, 3, ytdFlexyElm.hasAttribute('userscript-chatblock'))


      }


        


      if (pageType === 'watch') { // reset info when hidden
        checkVisibleEngagementPanel();
      }

      if(chatTypeChanged){
        
        if (attr_chatblock == 'chat-live') {

          _console.log(932, 4)

          mtf_forceCheckLiveVideo_disable = 2;

          _disableComments();


        } else {

          _console.log(932, 5)
          mtf_forceCheckLiveVideo_disable = 0;
          setCommentSection(0);
          restoreFetching();

          _console.log(932, 6, mtf_forceCheckLiveVideo_disable)

          if (mtf_forceCheckLiveVideo_disable !== 2) {

            const tabBtn = document.querySelector('[userscript-tab-content="#tab-comments"].tab-btn-hidden')
            if (tabBtn) {
              emptyCommentSection();
              tabBtn.classList.remove("tab-btn-hidden")
            }

          }



        }


      } else {

        // restore Fetching only


        if (mtf_forceCheckLiveVideo_disable !== 2 && (attr_chatblock === false || attr_chatblock === 'chat-playback')) {


          setCommentSection(0);
          restoreFetching();

        }



      }

    }

    f();





  }

 

  document.addEventListener('wheel', function(evt) {

    if (!scriptEnable) return;
    const displayedPlaylist_element = kRef(displayedPlaylist);
    if (displayedPlaylist_element && elementContains.call(displayedPlaylist_element, evt.target)) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }, capturePassive);


  function setVideosTwoColumns(/** @type {number} */ flag, /** @type {boolean} */ bool) {

    //two columns to one column

    /*
        [placeholder-videos] ytd-watch-next-secondary-results-renderer.style-scope.ytd-watch-flexy

        is-two-columns =""  => no is-two-columns
        
        
        
        [placeholder-videos] tp-yt-paper-spinner#spinner.style-scope.ytd-continuation-item-renderer
        
        no hidden => hidden =""
        
        
        [placeholder-videos] div#button.style-scope.ytd-continuation-item-renderer
        
        
        hidden ="" => no hidden
        

        */

    let cssSelector1 = '[placeholder-videos] ytd-watch-next-secondary-results-renderer.style-scope.ytd-watch-flexy'

    let cssSelector2 = '[placeholder-videos] tp-yt-paper-spinner#spinner.style-scope.ytd-continuation-item-renderer'

    let cssSelector3 = '[placeholder-videos] div#button.style-scope.ytd-continuation-item-renderer'

    let res = {}
    if (flag & 1) {
      res.m1 = document.querySelector(cssSelector1)
      if (res.m1) wAttr(res.m1, 'is-two-columns', bool ? '' : false);
    }

    if (flag & 2) {
      res.m2 = document.querySelector(cssSelector2)
      if (res.m2) wAttr(res.m2, 'hidden', bool ? false : '');
    }

    if (flag & 4) {
      res.m3 = document.querySelector(cssSelector3)
      if (res.m3) wAttr(res.m3, 'hidden', bool ? '' : false);
    }


    return res




  }

  let lastScrollFetch = 0;
  // function isScrolledToEnd(){
  //     return (window.innerHeight + window.pageYOffset) >= document.scrollingElement.scrollHeight - 2;
  // }
  let lastOffsetTop = 0;
  window.addEventListener('scroll', function(evt) {

    //console.log(evt.target)

    if (!scriptEnable) return;

    let isTwoCol = (wls.layoutStatus & LAYOUT_TWO_COLUMNS) === LAYOUT_TWO_COLUMNS
    if(isTwoCol) return;

    if (!kRef(scrollingVideosList)) return;
    if (videoListBeforeSearch) return;



    let visibleHeight = document.scrollingElement.clientHeight;
    let totalHeight = document.scrollingElement.scrollHeight;

    if (totalHeight < visibleHeight * 1.5) return; // filter out two column view;

    let z = window.pageYOffset + visibleHeight;
    let h_advanced = totalHeight - (visibleHeight > 5 * 40 ? visibleHeight * 0.5 : 40);



    if (z > h_advanced) {

      let ct = Date.now();
      if (ct - lastScrollFetch < 500) return; //prevent continuous calling

      lastScrollFetch = ct;

      let res = setVideosTwoColumns(2 | 4, true)
      if (res.m3 && res.m2) {

        //wait for DOM change, just in case
        requestAnimationFrame(() => {
          let { offsetTop } = res.m2 // as visibility of m2 & m3 switched.

          if (offsetTop - lastOffsetTop < 40) return; // in case bug, or repeating calling.  // the next button shall below the this button 
          lastOffsetTop = offsetTop

          res.m2.parentNode.dispatchEvent(new Event('yt-service-request-sent-button-renderer'))

          res = null
        })

      } else {

        res = null
      }


    }




  }, bubblePassive)
 

  let fetchPendings = [];
  let mtf_forceCheckLiveVideo_disable = 0;

  let storeLastPanel = null;

  




  let mgChatFrame = {
    setVar(elm) {
      mgChatFrame.kVar = mWeakRef(elm)
    },
    getVar() {
      return kRef(mgChatFrame.kVar)
    },
    inPage() {
      let elm = mgChatFrame.getVar();
      if (!elm) return false;
      let ytdFlexyElm = kRef(ytdFlexy);
      if(!ytdFlexyElm) return false;
      return elementContains.call(ytdFlexyElm, elm)
    }
  };

  const timeline = {
    // after initialized (initObserver)
    cn1:{},
    cn2:{},
    setTimeout( /** @type {TimerHandler} */ f,/** @type {number} */ d){
      let cid = setTimeout(f,d)
      timeline.cn1[cid]=true
      return cid;
    },
    clearTimeout(/** @type {number} */ cid){
      timeline.cn1[cid]=false; return clearTimeout(cid)
    },
    setInterval(/** @type {TimerHandler} */ f,/** @type {number} */ d){
      let cid = setInterval(f,d);
      timeline.cn2[cid]=true
      return cid;
    },
    clearInterval(/** @type {number} */ cid){
      timeline.cn2[cid]=false; return clearInterval(cid)
    },
    reset(){
      for(let cid in timeline.cn1) timeline.cn1[cid] && clearTimeout(cid)
      for(let cid in timeline.cn2) timeline.cn2[cid] && clearInterval(cid)
      timeline.cn1={}
      timeline.cn2={}
    }
  }

  class AttributeMutationObserver extends MutationObserver {
    constructor(flist){
      super((mutations, observer)=>{
        for(const mutation of mutations){
          if (mutation.type === 'attributes') {
            this.checker(mutation.target, mutation.attributeName)
          }
        }
      })
      this.flist=flist;
      this.res={}
    }
    
    takeRecords(){
      super.takeRecords();
    }
    disconnect(){
      this._target = null;
      super.disconnect();
    }
    observe(/** @type {Node} */ target){
      if(this._target) return; 
      //console.log(123124, target)
      this._target = mWeakRef(target);
      
      //console.log(123125, kRef(this._target))
      const options = {
        attributes: true,
        attributeFilter: Object.keys(this.flist),
        //attributeFilter: [ "status", "username" ],
        attributeOldValue: true
      }
      super.observe(target, options)
    }
    checker(/** @type {Node} */ target,/** @type {string} */ attributeName){
      let nv = target.getAttribute(attributeName);
      if(this.res[attributeName]!==nv){
        this.res[attributeName] = nv
        let f = this.flist[attributeName];
        if(f) f(attributeName, nv);

      }
    }
    check(delay = 0){
      setTimeout(()=>{
        let target = kRef(this._target)
        if(target!==null){
          for(const key of Object.keys(this.flist)){
            this.checker(target,key)
          }
        }else{
          console.log('target is null') //disconnected??
        }
        target = null;
      },delay)
    }
  } 

  function goYoutubeGeniusLyrics() {

    setTimeout(function $f() {

      if (!document.documentElement.hasAttribute('w-engagement-panel-genius-lyrics')) return setTimeout($f, 100)

      document.documentElement.dispatchEvent(new CustomEvent('engagement-panel-genius-lyrics'))


    }, 100)



  }



  //Object.keys($0).filter(key=>!(key in $0.constructor.prototype))

  //Object.getOwnPropertyNames(window).filter(k=>k.startsWith('HTML'))
  //Object.getOwnPropertyNames(window).filter(k=>k.startsWith('HTML')).filter(k=>$0 instanceof window[k])


  /* --------------------------- browser's bug in -webkit-box ----------------------------------------- */

  /*
   fix bug for comment section - version 1.8.7 
  This issue is the bug in browser's rendering
   I guess, this is due to the lines clamp with display:-webkit-box 
   use stupid coding to let it re-render when its content become visible
   
  /*

  ytd-expander[should-use-number-of-lines][collapsed] > #content.ytd-expander {
      color: var(--yt-spec-text-primary);
      display: -webkit-box;
      overflow: hidden;
      max-height: none;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--ytd-expander-max-lines, 4);
  }

  // v1.8.36 imposed a effective solution for fixing this bug

  */

  /* --------------------------- browser's bug in -webkit-box ----------------------------------------- */


  /**
   * 


f.initChildrenObserver=function(){var a=this;this.observer=new MutationObserver(function(){return a.childrenChanged()});
this.observer.observe(this.$.content,{subtree:!0,childList:!0,attributes:!0});this.childrenChanged()};
f.childrenChanged=function(){var a=this;this.alwaysToggleable?this.canToggle=this.alwaysToggleable:this.canToggleJobId||(this.canToggleJobId=window.requestAnimationFrame(function(){$h(function(){a.canToggleJobId=0;a.calculateCanCollapse()})}))};


f.onIronResize=function(){this.recomputeOnResize&&this.childrenChanged()};


onButtonClick_:function(){this.fire("yt-close-upsell-dialog")},
computeHasHeader_:function(a){return!!a.headerBackgroundImage}});var geb;var heb;var ieb;var jeb;var xI=function(){var a=L.apply(this,arguments)||this;a.alignAuto=!1;a.collapsed=!0;a.isToggled=!1;a.alwaysCollapsed=!1;a.canToggle=!0;a.collapsedHeight=80;a.disableToggle=!1;a.alwaysToggleable=!1;a.reversed=!1;a.shouldUseNumberOfLines=!1;a.recomputeOnResize=!1;a.canToggleJobId=0;return a};
n(xI,L);f=xI.prototype;f.alwaysToggleableChanged=function(){this.alwaysToggleable&&(this.canToggle=!0)};


f.calculateCanCollapse=function(){this.canToggle=this.shouldUseNumberOfLines?this.alwaysToggleable||this.$.content.offsetHeight<this.$.content.scrollHeight:this.alwaysToggleable||this.$.content.scrollHeight>this.collapsedHeight};
f.detachObserver=function(){this.observer&&this.observer.disconnect()};

   * 
   * 
   * 
   */




})();
