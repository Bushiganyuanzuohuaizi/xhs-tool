(function(){
  'use strict';

  /* 派系视觉徽章（currentColor 跟随派系主题色） */
  function getPortraitSvg(code){
    var head='<svg viewBox="0 0 240 280" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="派系视觉徽章">' +
             '<rect width="240" height="280" rx="20" fill="#FAF9F5"/>' +
             '<circle cx="120" cy="118" r="80" fill="currentColor" fill-opacity="0.12"/>' +
             '<circle cx="120" cy="118" r="80" stroke="currentColor" stroke-width="2"/>';
    var tail='<line x1="60" y1="118" x2="180" y2="118" stroke="#16140F" stroke-opacity="0.12" stroke-width="1"/></svg>';

    /* 岁静派：淡出的同心圆 + 中心小点（勿扰 / 静音模式） */
    if(code==='Q'){
      return head +
        '<circle cx="120" cy="118" r="50" stroke="currentColor" stroke-opacity="0.22" stroke-width="2" fill="none"/>' +
        '<circle cx="120" cy="118" r="34" stroke="currentColor" stroke-opacity="0.12" stroke-width="1.5" fill="none"/>' +
        '<circle cx="120" cy="118" r="8" fill="currentColor" fill-opacity="0.55"/>' +
        tail;
    }
    /* 乐子人：大笑脸 + 戏谑星星眼 */
    if(code==='J'){
      return head +
        '<path d="M72 92 Q96 78 120 92 Q144 78 168 92" stroke="#16140F" stroke-width="4.5" stroke-linecap="round" fill="none"/>' +
        '<path d="M88 148 Q120 196 152 148" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/>' +
        '<circle cx="95" cy="112" r="6.5" fill="#16140F"/>' +
        '<circle cx="145" cy="112" r="6.5" fill="#16140F"/>' +
        '<path d="M178 64 L198 84 M198 64 L178 84" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
        tail;
    }
    /* 皇汉：玉璧 / 中心纹样 */
    if(code==='H'){
      return head +
        '<circle cx="120" cy="118" r="58" stroke="currentColor" stroke-opacity="0.32" stroke-width="2" fill="none"/>' +
        '<circle cx="120" cy="118" r="44" stroke="currentColor" stroke-opacity="0.18" stroke-width="1.5" fill="none"/>' +
        '<path d="M120 74 L128 96 H112 Z" fill="currentColor" fill-opacity="0.28"/>' +
        '<path d="M96 118 L118 126 L96 134 Z" fill="currentColor" fill-opacity="0.28"/>' +
        '<path d="M144 118 L122 126 L144 134 Z" fill="currentColor" fill-opacity="0.28"/>' +
        '<path d="M120 162 L112 140 H128 Z" fill="currentColor" fill-opacity="0.28"/>' +
        tail;
    }
    /* 默认：原来的几何笑脸 */
    return head +
      '<path d="M120 38 A80 80 0 0 1 200 118 L120 118 Z" fill="currentColor" fill-opacity="0.20"/>' +
      '<circle cx="95" cy="110" r="7" fill="#16140F"/>' +
      '<circle cx="145" cy="110" r="7" fill="#16140F"/>' +
      '<path d="M97 148 Q120 167 143 148" stroke="currentColor" stroke-width="4" stroke-linecap="round" fill="none"/>' +
      tail;
  }

  var THEME = {
    F:'#2F6B57', E:'#3A5A8C', L:'#B0451F', R:'#7A6A4F', A:'#C2562E',
    H:'#8A6D3B', X:'#4A4A4A', Q:'#6E7E8C', J:'#B05C7A'
  };

  var questions=[
    {k:'SCENE 01',t:'看到一条“专家说普通人应该……”的热搜，你第一反应是？',c:'先决定你相信谁，还是先拆解这句话？',o:[['先看谁在说、代表谁的利益','skeptic'],['只要观点有道理，谁说都一样','rational'],['专家经验值得尊重，先听完再说','order'],['先看评论区，群众的直觉通常最准','people']]},
    {k:'SCENE 02',t:'如果一项新规让生活更有秩序，但也多了一点限制，你会？',c:'秩序与自由，哪一个更像你的默认设置？',o:[['只要边界清楚，秩序可以换来安全感','order'],['限制一旦开了口子，就该保持警惕','liberty'],['看它有没有真正解决问题，别只看口号','rational'],['先问问最受影响的人怎么想','people']]},
    {k:'SCENE 03',t:'你怎么看“先发展起来，其他问题以后再解决”？',c:'当效率和公平被放到同一张桌上……',o:[['没有发展，公平很容易变成空话','growth'],['如果分配不公，发展越快越拧巴','equality'],['这是一个需要数据验证的经验判断','rational'],['谁承担代价，谁就应该有发言权','people']]},
    {k:'SCENE 04',t:'朋友转发一篇观点很合你胃口的长文，你会？',c:'共鸣很快，核实要不要跟上？',o:[['先收藏，转发的人应该也核过了','trust'],['先找原始来源和反驳，再决定','skeptic'],['看看它是否解释了现实，而不只是漂亮话','rational'],['转给朋友讨论，观点就是拿来碰撞的','dialogue']]},
    {k:'SCENE 05',t:'你觉得互联网最珍贵的东西是什么？',c:'这是你的价值排序题。',o:[['每个人都能发声的机会','liberty'],['一群人一起把事情做成的能力','collective'],['不被情绪带走的事实感','rational'],['对弱者和少数者的照顾','equality']]},
    {k:'SCENE 06',t:'面对“以前一直都是这样”的说法，你通常？',c:'传统是经验，也可能是惯性。',o:[['有用的传统当然该保留','tradition'],['先问一句：为什么不能改？','reform'],['先做小范围试验，结果说话','rational'],['改可以，但别把普通人的生活当实验品','people']]},
    {k:'SCENE 07',t:'当一个热门议题迅速变成二选一，你会？',c:'世界真的只有两个按钮吗？',o:[['先退出站队，二选一通常是陷阱','skeptic'],['关键时刻就要明确表态','stand'],['把问题拆成几层，分别讨论','rational'],['看哪一方更能让更多人参与','people']]},
    {k:'SCENE 08',t:'你更愿意把希望寄托在哪里？',c:'制度、个人，还是一群人的协作？',o:[['规则设计得好，普通人就不必靠运气','institution'],['真正的改变总要从具体的人开始','individual'],['很多事只能靠大家一起磨出来','collective'],['别寄托，先看看证据和成本','rational']]},
    {k:'SCENE 09',t:'如果你能给互联网加一条新规则，会是什么？',c:'你的底层诉求，会在这里露出来。',o:[['任何人都有不被骚扰的边界','liberty'],['平台必须对传播后果负责','institution'],['让事实核查变得更容易','rational'],['给沉默的人一个更大的麦克风','equality']]},
    {k:'SCENE 10',t:'你最反感哪一种键政姿势？',c:'讨厌的，往往正是你在意的。',o:[['拿身份代替论证','skeptic'],['只会复读，完全没有自己的判断','individual'],['为了赢而故意扭曲事实','rational'],['把复杂的人压扁成一个标签','people']]},
    {k:'SCENE 11',t:'讨论无果时，你会怎样收尾？',c:'分歧不可怕，处理分歧的方式很说明问题。',o:[['先暂停，保留继续理解的可能','dialogue'],['我立场不改，但会听你把话说完','stand'],['约定一个可以验证的事实再回来','rational'],['算了，现实会给出答案','pragmatic']]},
    {k:'SCENE 12',t:'哪句话最像你最近的状态？',c:'最后一题，选一句最接近当下的你。',o:[['我不想被任何阵营代表','liberty'],['总得有人把事情往前推','growth'],['别急，先把问题说清楚','rational'],['先照顾好具体的人，再谈宏大叙事','people']]}
  ];
  var profiles={
    '自由派':{code:'F-01',representative:'户晨风',avatar:'./assets/avatars/huchenfeng.webp',tag:'先守住每个人可以说“不”的地方',quote:'自由的价值，是让每个人都有选择和退出的余地。',traits:['个人边界','权利意识','警惕权力'],explain:'你本能地把个体放在集体之前：任何“为了大家好”的理由，都要先说清它有没有越过具体之人的边界。你警惕权力的扩张，也警惕以共识为名的裹挟。这种姿态常让你在争论里显得冷感，却也守住了少数人说话的余地。只是有时，你会把“不合作”误当成“有立场”，把防御姿态当成全部主张，把守住边界的能力，反过来当成拒绝理解他人的特权。',axes:[['个人自由',94],['社会公平',61],['制度信任',35],['情绪参与',42]]},
    '建制派':{code:'E-02',representative:'那兔',avatar:'./assets/avatars/natu.jpg',tag:'稳定的规则，是所有人继续生活的底盘',quote:'先把共同的事情做好，社会才有继续向前的底气。',traits:['秩序优先','国家认同','长期稳定'],explain:'你更相信秩序是所有人继续生活的前提：清晰的规则、连续的制度和共同的国家认同，比一次痛快的反抗更可靠。面对争议，你倾向先稳住整体，再谈局部的不满。这份稳重稀缺，但当规则本身已经需要被质疑时，你对“破坏秩序”的本能警觉，容易把守成误认为正义，把异议当成风险，把体制本身也当成不容讨论的前提。',axes:[['个人自由',49],['社会公平',67],['制度信任',94],['情绪参与',58]]},
    '左派':{code:'L-03',representative:'司马南',avatar:'./assets/avatars/simanan.jpg',tag:'先看见分配与劳动，再谈效率和增长',quote:'如果增长没有让更多人过得更好，它就还不完整。',traits:['共同富裕','反对资本垄断','劳动视角'],explain:'你习惯从分配、劳动和弱势者的处境切入：贫富差距、资本集中、劳动保障，是你最先看见的东西。你倾向把公平放在效率前面谈。这种视角能戳破增长叙事的盲区，也让你对结构性不公保持敏感。但若只停留在批判，容易在“谁更可怜”的比赛里耗尽改革的力气，拿不出可落地的替代方案，也错把愤怒本身当成建设。',axes:[['个人自由',53],['社会公平',95],['制度信任',66],['情绪参与',63]]},
    '改良派':{code:'R-04',representative:'康有为',avatar:'./assets/avatars/kangyouwei.webp',tag:'不推倒重来，在现实里一点点改进',quote:'真正有效的改变，往往从可行的下一步开始。',traits:['渐进改良','现实主义','制度试错'],explain:'你不信任一夜翻盘，更相信在现实条件里持续修补、试错和积累。你愿意承认问题的复杂，也愿意为更好的制度寻找可行的下一步。你的稳妥能避免浪漫主义的灾难，是优势。但当现状本身就在持续制造不公时，“慢慢来”未必是答案，渐进也可能变成对既得利益的温柔维护，把耐心当成回避冲突的借口。',axes:[['个人自由',71],['社会公平',73],['制度信任',69],['情绪参与',45]]},
    '加速派':{code:'A-05',representative:'山姆·奥特曼（Sam Altman）',avatar:'./assets/avatars/samaltman.jpg',tag:'旧系统不动，矛盾就不会自己消失',quote:'当变化不可避免，至少要看清它会把我们带到哪里。',explain:'你对缓慢修补缺乏耐心，更关注技术、资本与结构被快速重构的可能。你接受高风险的试验，也乐于推倒旧系统、看新东西长出。这份锋利能冲破惰性，却也必须正视：加速的代价往往由最没准备好的人先扛，失控不会提前打招呼。你追逐方向，却常常低估转向时的离心力，以及新秩序中旧伤口的延续。',axes:[['个人自由',66],['社会公平',47],['制度信任',29],['情绪参与',86]]},
    '皇汉':{code:'H-06',representative:'闻达 / 杜车别',tag:'民族历史，是理解现实的一把钥匙',quote:'先弄清我们从哪里来，再讨论要走向哪里。',traits:['汉族中心','历史叙事','文化正统'],explain:'你特别看重汉族历史、文化认同与民族叙事，倾向从历史连续性和文化主体性理解现实。这一派内部差异极大，从文化自豪到极端排外都在其中。历史认同可以是力量，也可能在寻找“我们”的过程中，把更复杂的人压缩成敌人。认同不必以排斥他者为前提，主体感也不等于排他性，否则历史会变成拒绝当下的武器。',axes:[['个人自由',48],['社会公平',52],['制度信任',58],['情绪参与',91]]},
    '神友 / 抽象派':{code:'X-07',representative:'李赣',avatar:'./assets/avatars/ligang.webp',tag:'把严肃叙事拆掉，先看它有多荒诞',quote:'当所有人都在认真表演，抽象有时是另一种清醒。',traits:['反讽解构','黑话梗文化','虚无旁观'],explain:'你用反讽、恶搞和抽象话语拆解宏大叙事，对权威与阵营都保持距离。你追求表达的冲击力与荒诞感，也以此保护自己的清醒。但当一切都被解构成梗，严肃议题也会被娱乐化冲淡——你笑得越狠，有时越难被人听清你真正在意什么。解构是本能，重建却需要你愿意偶尔收起引号，认真说一次不绕弯的话。',axes:[['个人自由',76],['社会公平',39],['制度信任',18],['情绪参与',95]]},
    '岁静派':{code:'Q-08',representative:'NPC',tag:'世界很吵，但我先把自己的生活过好',quote:'不参与每一场争论，也是一种对生活的选择。',traits:['低政治参与','生活优先','避免冲突'],explain:'你对宏大政治议题缺少持续热情，更关心工作、家庭、生活和自己的情绪稳定。你未必没有观点，只是不愿把时间投入无休止的争论。这是一种自洽的活法，也省下了被情绪劫持的代价。但当不该沉默的时刻选择旁观，“不关心”本身也会变成一种立场——而且是既得利益者最欢迎的那一种，它让公共空间里少了一个本该出现的声音。',axes:[['个人自由',62],['社会公平',45],['制度信任',51],['情绪参与',12]]},
    '乐子人':{code:'J-09',representative:'米线山',tag:'先别急着站队，看看这场戏会怎么演',quote:'严肃世界也会失控，至少先把荒诞看明白。',traits:['旁观娱乐','冲突观赏','不急站队'],explain:'你更容易被事件的戏剧性、反转和荒诞感吸引，习惯先旁观、玩梗、看热闹，而不是马上站队。保持距离让你看得更清，也天然规避了阵营的消耗。但当真实的人正在承受后果，把一切当戏看会稀释本该有的同理。你享受抽离的自由，也要记得——有些剧本的代价，是由观众之外的别人支付的，你的笑声也是现场的一部分。',axes:[['个人自由',69],['社会公平',40],['制度信任',33],['情绪参与',88]]}
  };

  var state={index:0,answers:[]};
  var lastProfile=null;
  var el=function(id){return document.getElementById(id)};

  /* ---------- 视图切换 ---------- */
  function show(view){
    ['intro-view','quiz-view','result-view'].forEach(function(id){el(id).hidden=id!==view;});
    window.scrollTo(0,0);
  }

  /* ---------- 答题 ---------- */
  function renderQuestion(){
    var q=questions[state.index];
    el('question-index').textContent=String(state.index+1).padStart(2,'0')+' / 12';
    el('question-kicker').textContent=q.k;
    el('question-title').textContent=q.t;
    el('question-context').textContent=q.c;
    el('progress-bar').style.width=((state.index+1)/questions.length*100)+'%';
    var box=el('options');
    box.innerHTML='';
    q.o.forEach(function(item,i){
      var b=document.createElement('button');
      b.type='button';
      b.className='option'+(state.answers[state.index]===item[1]?' selected':'');
      b.setAttribute('role','radio');
      b.setAttribute('aria-checked',state.answers[state.index]===item[1]?'true':'false');
      b.innerHTML='<span class="option-index">'+String.fromCharCode(65+i)+'</span><span class="option-text">'+item[0]+'</span>';
      b.addEventListener('click',function(){state.answers[state.index]=item[1];renderQuestion();setTimeout(next,180);});
      box.appendChild(b);
    });
    el('back-btn').style.visibility=state.index?'visible':'hidden';
  }
  function next(){
    if(!state.answers[state.index])return;
    if(state.index<questions.length-1){state.index++;renderQuestion();}
    else renderResult();
  }

  /* ---------- 结果 ---------- */
  function computeProfile(){
    var counts={};
    state.answers.forEach(function(a){counts[a]=(counts[a]||0)+1;});
    var score={
      自由派:(counts.liberty||0)+(counts.individual||0),
      建制派:(counts.order||0)+(counts.institution||0)+(counts.trust||0),
      左派:(counts.equality||0)+(counts.collective||0),
      改良派:(counts.reform||0)+(counts.dialogue||0)+(counts.rational||0),
      加速派:(counts.growth||0)+(counts.stand||0),
      皇汉:(counts.tradition||0),
      神友:(counts.skeptic||0),
      岁静派:(counts.pragmatic||0),
      乐子人:(counts.people||0)
    };
    var key=Object.keys(score).sort(function(a,b){return score[b]-score[a]})[0];
    var names={'神友':'神友 / 抽象派'};
    return profiles[names[key]||key]||profiles['岁静派'];
  }

  function renderResult(){
    var profile=computeProfile();
    lastProfile=profile;
    var accent=THEME[profile.code.slice(0,1)]||'#B0451F';

    el('result-portrait').innerHTML=profile.avatar
      ? '<img src="'+profile.avatar+'" alt="'+profile.representative+'" class="avatar-img">'
      : getPortraitSvg(profile.code.slice(0,1));
    el('result-name').textContent=Object.keys(profiles).find(function(n){return profiles[n]===profile;});
    el('result-representative').textContent=profile.representative;
    el('result-code').textContent=profile.code;
    el('result-tagline').textContent=profile.tag;
    el('result-quote').textContent=profile.quote;
    el('result-explain').textContent=profile.explain;

    el('trait-list').innerHTML=profile.traits.map(function(t){return '<span class="trait">'+t+'</span>';}).join('');
    el('axis-list').innerHTML=profile.axes.map(function(a){
      return '<div class="axis-row"><span class="axis-name">'+a[0]+'</span><span class="axis-track"><span class="axis-fill" style="width:0" data-w="'+a[1]+'"></span></span><span class="axis-value">'+a[1]+'</span></div>';
    }).join('');

    el('result-view').dataset.theme=profile.code.slice(0,1);
    el('result-view').style.setProperty('--accent',accent);
    show('result-view');

    /* 坐标轴入场动画 */
    requestAnimationFrame(function(){
      el('axis-list').querySelectorAll('.axis-fill').forEach(function(f){
        f.style.width=f.getAttribute('data-w')+'%';
      });
    });
  }

  /* ---------- 分享海报（原生 Canvas） ---------- */
  function loadImage(src){
    return new Promise(function(resolve,reject){
      var img=new Image();
      img.crossOrigin='anonymous';
      img.onload=function(){resolve(img);};
      img.onerror=function(){reject(new Error('avatar load failed'));};
      img.src=src;
    });
  }
  function svgToImage(svg){
    return loadImage('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
  }
  async function drawBadgeSvg(x,code,cx,cy,size){
    try{
      var img=await svgToImage(getPortraitSvg(code));
      drawRoundImage(x,img,cx,cy,size);
    }catch(e){
      drawBadge(x,cx,cy,size,THEME[code]||'#B0451F');
    }
  }

  async function buildPoster(){
    var profile=lastProfile;
    if(!profile)return null;
    var accent=THEME[profile.code.slice(0,1)]||'#B0451F';
    var name=Object.keys(profiles).find(function(n){return profiles[n]===profile;});

    var W=1080,H=1350;
    var c=document.createElement('canvas');
    c.width=W;c.height=H;
    var x=c.getContext('2d');

    /* 背景 */
    x.fillStyle='#FAF9F5';x.fillRect(0,0,W,H);
    x.strokeStyle='#E6E1D6';x.lineWidth=2;x.strokeRect(40,40,W-80,H-80);

    /* 顶部 */
    x.fillStyle=accent;x.font='600 26px -apple-system,"PingFang SC",sans-serif';
    x.textBaseline='alphabetic';
    x.fillText('观点档案室 · 终局档案',72,112);
    x.fillStyle='#8B857A';x.font='400 24px -apple-system,"PingFang SC",sans-serif';
    x.textAlign='right';x.fillText('VOL.01 / 2026',W-72,112);x.textAlign='left';

    /* 分隔线 */
    x.strokeStyle='#E6E1D6';x.beginPath();x.moveTo(72,140);x.lineTo(W-72,140);x.stroke();

    /* 派系名 */
    x.fillStyle='#8B857A';x.font='600 24px -apple-system,"PingFang SC",sans-serif';
    x.fillText('你的互联网键政派系是',72,200);
    x.fillStyle='#16140F';
    x.font='700 96px Georgia,"Songti SC",serif';
    x.fillText(name,72,300);
    x.fillStyle=accent;x.font='600 32px -apple-system,"PingFang SC",sans-serif';
    x.fillText(profile.tag,72,356);

    /* 头像或几何徽章 */
    if(profile.avatar){
      try{
        var avatar=await loadImage(profile.avatar);
        drawRoundImage(x, avatar, W-72-200, 196, 200);
      }catch(e){
        await drawBadgeSvg(x, profile.code.slice(0,1), W-72-200, 196, 200);
      }
    }else{
      await drawBadgeSvg(x, profile.code.slice(0,1), W-72-200, 196, 200);
    }

    /* 代表 IP */
    x.fillStyle='#8B857A';x.font='600 22px -apple-system,"PingFang SC",sans-serif';
    x.fillText('代表性 IP',72,420);
    x.fillStyle='#16140F';x.font='700 30px -apple-system,"PingFang SC",sans-serif';
    x.fillText(profile.representative,72,462);
    x.fillStyle='#16140F';x.font='700 24px -apple-system,"PingFang SC",sans-serif';
    x.textAlign='right';x.fillText(profile.code,W-72,462);x.textAlign='left';

    /* 坐标轴 */
    var ay=560, rowH=72;
    x.fillStyle='#8B857A';x.font='600 22px -apple-system,"PingFang SC",sans-serif';
    x.fillText('坐标切片',72,ay-46);
    profile.axes.forEach(function(a,i){
      var ry=ay+i*rowH,cy=ry+4;
      x.fillStyle='#16140F';x.font='500 26px -apple-system,"PingFang SC",sans-serif';
      x.fillText(a[0],72,cy);
      x.fillStyle='#16140F';x.font='700 26px -apple-system,"PingFang SC",sans-serif';
      x.textAlign='right';x.fillText(String(a[1]),W-72,cy);x.textAlign='left';
      var bx=230,bw=W-72-230-90,bh=16,by=ry-20;
      x.fillStyle='#E6E1D6';roundRect(x,bx,by,bw,bh,8);x.fill();
      x.fillStyle=accent;roundRect(x,bx,by,bw*a[1]/100,bh,8);x.fill();
    });

    /* 派系剖析 */
    var py=ay+profile.axes.length*rowH-20;
    x.fillStyle='#8B857A';x.font='600 22px -apple-system,"PingFang SC",sans-serif';
    x.fillText('派系剖析',72,py);
    x.fillStyle='#16140F';x.font='400 24px -apple-system,"PingFang SC",sans-serif';
    wrapText(x,profile.explain,72,py+38, W-144, 40);

    /* 关键词 */
    var ty=py+38+6*40+24;
    x.fillStyle='#8B857A';x.font='600 22px -apple-system,"PingFang SC",sans-serif';
    x.fillText('关键词',72,ty-16);
    ty+=18;
    var tx=72, tagH=42;
    profile.traits.forEach(function(t){
      x.font='600 24px -apple-system,"PingFang SC",sans-serif';
      var tw=x.measureText(t).width+40;
      if(tx+tw>W-72 && tx>72){tx=72;ty+=tagH+12;}
      x.fillStyle=accent;roundRect(x,tx,ty,tw,tagH,tagH/2);x.fill();
      x.fillStyle='#FAF9F5';x.fillText(t,tx+20,ty+29);
      tx+=tw+12;
    });

    /* 底部 */
    var by=H-132;
    x.strokeStyle='#E6E1D6';x.beginPath();x.moveTo(72,by);x.lineTo(W-72,by);x.stroke();
    x.fillStyle='#16140F';x.font='700 34px Georgia,"Songti SC",serif';
    x.fillText('你是哪一个派系？',72,by+52);
    x.fillStyle='#8B857A';x.font='400 22px -apple-system,"PingFang SC",sans-serif';
    x.fillText('把结果图分享到小红书，看看朋友们的坐标',72,by+90);

    return c;
  }

  function drawBadge(x,cx,cy,size,accent){
    x.save();
    x.translate(cx,cy);
    x.fillStyle='#FAF9F5';roundRect(x,0,0,size,size,24);x.fill();
    var r=size*0.40, ox=size/2, oy=size/2;
    x.fillStyle=accent;x.globalAlpha=0.12;x.beginPath();x.arc(ox,oy,r,0,Math.PI*2);x.fill();x.globalAlpha=1;
    x.strokeStyle=accent;x.lineWidth=3;x.beginPath();x.arc(ox,oy,r,0,Math.PI*2);x.stroke();
    x.fillStyle=accent;x.globalAlpha=0.20;x.beginPath();x.moveTo(ox,oy-r);x.arc(ox,oy,r,Math.PI*1.5,Math.PI*2);x.lineTo(ox,oy);x.closePath();x.fill();x.globalAlpha=1;
    x.fillStyle='#16140F';x.beginPath();x.arc(ox-r*0.32,oy-r*0.10,r*0.09,0,Math.PI*2);x.fill();
    x.beginPath();x.arc(ox+r*0.32,oy-r*0.10,r*0.09,0,Math.PI*2);x.fill();
    x.strokeStyle=accent;x.lineWidth=5;x.lineCap='round';
    x.beginPath();x.arc(ox,oy+r*0.18,r*0.30,0.15*Math.PI,0.85*Math.PI);x.stroke();
    x.restore();
  }

  function drawRoundImage(x,img,cx,cy,size){
    x.save();
    x.beginPath();
    roundRect(x,cx,cy,size,size,24);
    x.closePath();
    x.clip();
    var s=Math.max(size/img.width,size/img.height);
    var w=img.width*s,h=img.height*s;
    x.drawImage(img,cx+(size-w)/2,cy+(size-h)/2,w,h);
    x.restore();
    x.strokeStyle=THEME[lastProfile.code.slice(0,1)]||'#B0451F';x.lineWidth=3;
    roundRect(x,cx,cy,size,size,24);x.stroke();
  }

  function drawQR(x,cx,cy,size){
    x.fillStyle='#fff';x.fillRect(cx,cy,size,size);
    x.strokeStyle='#16140F';x.lineWidth=2;x.strokeRect(cx,cy,size,size);
    x.fillStyle='#16140F';
    var n=11,cell=size/n;
    var seed=12345;
    function rnd(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;}
    for(var i=0;i<n;i++)for(var j=0;j<n;j++){
      if((i<3&&j<3)||(i<3&&j>n-4)||(j<3&&i>n-4))continue; /* 留角标 */
      if(rnd()>0.5)x.fillRect(cx+i*cell,cy+j*cell,cell,cell);
    }
  }

  function wrapText(x,text,x0,y,maxW,lh){
    var chars=text.split('');
    var line='';var yy=y;
    for(var i=0;i<chars.length;i++){
      var test=line+chars[i];
      if(x.measureText(test).width>maxW && line){
        x.fillText(line,x0,yy);line=chars[i];yy+=lh;
      }else line=test;
    }
    if(line)x.fillText(line,x0,yy);
  }

  function roundRect(x,rx,ry,rw,rh,r){
    x.beginPath();
    x.moveTo(rx+r,ry);
    x.arcTo(rx+rw,ry,rx+rw,ry+rh,r);
    x.arcTo(rx+rw,ry+rh,rx,ry+rh,r);
    x.arcTo(rx,ry+rh,rx,ry,r);
    x.arcTo(rx,ry,rx+rw,ry,r);
    x.closePath();
  }

  /* ---------- 海报浮层 ---------- */
  async function openPoster(){
    var canvas=await buildPoster();
    if(!canvas)return;
    var overlay=el('poster-overlay');
    var target=el('poster-canvas');
    target.width=canvas.width;target.height=canvas.height;
    target.getContext('2d').drawImage(canvas,0,0);
    overlay.hidden=false;
  }
  function closePoster(){el('poster-overlay').hidden=true;}
  function savePoster(){
    var target=el('poster-canvas');
    var link=document.createElement('a');
    link.download='键政派系-'+ (lastProfile?lastProfile.code:'result') +'.png';
    link.href=target.toDataURL('image/png');
    link.click();
  }

  /* ---------- 事件绑定 ---------- */
  el('start-btn').addEventListener('click',function(){state={index:0,answers:[]};show('quiz-view');renderQuestion();});
  el('back-btn').addEventListener('click',function(){if(state.index>0){state.index--;renderQuestion();}});
  el('restart-btn').addEventListener('click',function(){state={index:0,answers:[]};show('quiz-view');renderQuestion();});
  el('share-btn').addEventListener('click',openPoster);
  el('poster-close').addEventListener('click',closePoster);
  el('poster-save').addEventListener('click',savePoster);
  el('poster-overlay').addEventListener('click',function(e){if(e.target===this)closePoster();});
})();
