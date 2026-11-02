(() => {
  'use strict';
  const config = window.CFA_CLOUD_CONFIG || {};
  const mount = document.createElement('div');
  mount.id = 'cfa-cloud';
  mount.innerHTML = '<style>#cfa-cloud{position:fixed;z-index:5000;bottom:18px;right:18px;font:13px system-ui,-apple-system,sans-serif;color:#23334b}#cfa-cloud button{cursor:pointer}#cfa-cloud .cloud-trigger{background:#096e68;color:#fff;border:0;border-radius:30px;padding:12px 18px;box-shadow:0 8px 30px #1f3b4650;font-weight:700}#cfa-cloud .cloud-card{position:absolute;bottom:56px;right:0;width:min(340px,calc(100vw - 36px));background:white;border:1px solid #dce5ec;border-radius:16px;padding:20px;box-shadow:0 18px 55px #12273d33}#cfa-cloud h3{margin:0 0 9px;font-size:17px}#cfa-cloud .cloud-note{font-size:12px;line-height:1.7;color:#657488;margin:6px 0 13px}#cfa-cloud input{display:block;width:100%;box-sizing:border-box;padding:11px;margin:10px 0;border:1px solid #d9e4e9;border-radius:9px}#cfa-cloud .cloud-btn{width:100%;padding:11px;background:#08796e;color:white;border:0;border-radius:9px;margin:5px 0}#cfa-cloud .cloud-secondary{background:#f1f5f7;color:#304c5d}#cfa-cloud .cloud-status{font-size:11px;color:#6b7d91;line-height:1.5;margin-top:12px;word-break:break-word}</style><button class="cloud-trigger" type="button" id="cfa-cloud-toggle">☁ 云端同步</button><section class="cloud-card" id="cfa-cloud-panel" hidden><h3>跨设备同步</h3><p class="cloud-note" id="cfa-cloud-desc">登录后，在手机与电脑上使用同一个邮箱，自动同步练习进度和错题。</p><div id="cfa-cloud-signin"><input id="cfa-cloud-email" type="email" placeholder="你的邮箱" autocomplete="email"><button id="cfa-cloud-send" type="button" class="cloud-btn">发送登录邮件</button><input id="cfa-cloud-code" type="text" inputmode="numeric" placeholder="如邮件包含 6 位验证码，在此输入"><button id="cfa-cloud-verify" type="button" class="cloud-btn cloud-secondary">验证登录码</button></div><div id="cfa-cloud-signed" hidden><p class="cloud-note" id="cfa-cloud-user"></p><button type="button" class="cloud-btn" id="cfa-cloud-now">立即同步</button><button type="button" class="cloud-btn cloud-secondary" id="cfa-cloud-logout">退出账号</button></div><p class="cloud-status" id="cfa-cloud-status">正在检查云端设置…</p></section>';
  document.body.appendChild(mount);
  const $ = id => document.getElementById(id);
  let client=null, user=null, syncing=false, dirty=false, debounce=null, disabled=false;
  const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(config.url || '') && typeof config.publishableKey === 'string' && config.publishableKey.length > 20;
  const setStatus = msg => { $('cfa-cloud-status').textContent = msg; };
  $('cfa-cloud-toggle').onclick=()=>{$('cfa-cloud-panel').hidden=!$('cfa-cloud-panel').hidden;};
  const localState = () => ({stats:{},mistakes:{},stars:{},daily:{},session:null,...state});
  function mergeProgress(local,remote) {
    const result={stats:{},mistakes:{},stars:{},daily:{},session:null};
    for(const k of new Set([...Object.keys(remote.stats||{}),...Object.keys(local.stats||{})])){
      const a=(remote.stats||{})[k],b=(local.stats||{})[k];
      result.stats[k]=!a?b:!b?a:((b.last||0)>=(a.last||0)?b:a);
    }
    result.mistakes={...(remote.mistakes||{}),...(local.mistakes||{})};
    result.stars={...(remote.stars||{}),...(local.stars||{})};
    for (const k of new Set([...Object.keys(remote.daily||{}),...Object.keys(local.daily||{})]))
      result.daily[k]=Math.max((remote.daily||{})[k]||0,(local.daily||{})[k]||0);
    result.session=local.session?.created >= (remote.session?.created||0)?local.session:(remote.session||local.session||null);
    return result;
  }
  async function push() {
    if(!client||!user||syncing){dirty=true;return;}
    syncing=true;
    try {
      const payload=JSON.parse(JSON.stringify(localState()));
      const {error}=await client.from('cfa_sprint_progress').upsert({user_id:user.id,progress:payload,updated_at:new Date().toISOString()},{onConflict:'user_id'});
      if(error)throw error;
      dirty=false;setStatus('✓ 云端已保存 · '+new Date().toLocaleTimeString('zh-CN'));
    } catch(e){dirty=true;setStatus('同步未完成：'+e.message);}
    finally{syncing=false;if(dirty&&navigator.onLine) schedule();}
  }
  function schedule() {
    if(!client||!user)return;
    dirty=true;clearTimeout(debounce);debounce=setTimeout(push,1200);
  }
  async function pull() {
    if(!user||!client)return;
    if(syncing)return;
    syncing=true;
    try {
      const {data,error}=await client.from('cfa_sprint_progress').select('progress').eq('user_id',user.id).maybeSingle();
      if(error)throw error;
      if(data?.progress && typeof data.progress === 'object'){
        state=mergeProgress(localState(),data.progress);
        // persist without triggering another sync during hydration
        localStorage.setItem('cfa-sprint-progress-v1',JSON.stringify(state));
        render();
      }
      syncing=false;
      await push();
    } catch(e){setStatus('读取云端记录失败：'+e.message);syncing=false;}
  }
  async function loggedIn(nextUser) {
    user=nextUser;
    $('cfa-cloud-signin').hidden=!!user;
    $('cfa-cloud-signed').hidden=!user;
    $('cfa-cloud-user').textContent=user?'已登录：'+(user.email||''):'';
    $('cfa-cloud-toggle').textContent=user?'☁ 同步已连接':'☁ 云端同步';
    if(user){setStatus('正在恢复你的云端记录…');await pull();}
    else setStatus('未登录：作答暂存在本机。');
  }
  $('cfa-cloud-send').onclick=async()=>{
    if(!client)return;
    const email=$('cfa-cloud-email').value.trim();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){setStatus('请输入有效邮箱地址');return;}
    setStatus('正在发送登录邮件…');
    const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname}});
    setStatus(error?error.message:'登录邮件已发送。点击邮件中的登录链接，或输入验证码。');
  };
  $('cfa-cloud-verify').onclick=async()=>{
    if(!client)return;
    const email=$('cfa-cloud-email').value.trim(),token=$('cfa-cloud-code').value.trim();
    if(!email||!token){setStatus('请填写邮箱及验证码。');return;}
    setStatus('正在验证…');
    const {error}=await client.auth.verifyOtp({email,token,type:'email'});
    if(error)setStatus(error.message);
  };
  $('cfa-cloud-now').onclick=()=>pull();
  $('cfa-cloud-logout').onclick=async()=>{if(client)await client.auth.signOut();};
  window.CFA_SYNC={schedule};
  window.addEventListener('online',()=>{if(user)push();});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&user&&!dirty)pull();});
  if(!configured){
    disabled=true;
    setStatus('云端服务尚未配置；当前版本仍可本机刷题并导出备份。');
    $('cfa-cloud-send').disabled=true;$('cfa-cloud-verify').disabled=true;
    return;
  }
  const script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  script.onload=async()=>{
    try{
      client=window.supabase.createClient(config.url,config.publishableKey);
      client.auth.onAuthStateChange((evt,s)=>{if(evt==='SIGNED_IN'||evt==='SIGNED_OUT'||evt==='INITIAL_SESSION')loggedIn(s?.user||null);});
      const {data}=await client.auth.getUser();
      if(data?.user&&!user)loggedIn(data.user);
    }catch(e){setStatus('云端连接失败：'+e.message);}
  };
  script.onerror=()=>setStatus('无法加载云端组件。请检查网络。');
  document.head.appendChild(script);
})();