const rcApplicationDb=supabase.createClient(RC_CONFIG.url,RC_CONFIG.anonKey);
function rcOpenApplication(){
 if(document.getElementById('rcApply'))return;
 const overlay=document.createElement('div');overlay.id='rcApply';overlay.className='modalBackdrop open';
 overlay.innerHTML=`<div class="modalBox" role="dialog" aria-modal="true" aria-labelledby="rcApplyTitle"><button class="modalClose" aria-label="Cerrar">✕</button><h3 id="rcApplyTitle">Solicitar acceso a RC Capital</h3><p class="sub">Revisaremos tu solicitud antes de invitarte al portal.</p><form><label>Nombre completo<input name="nombre" required minlength="2" maxlength="150" autocomplete="name"></label><label>Correo electrónico<input name="email" type="email" required maxlength="254" autocomplete="email"></label><label>WhatsApp<input name="whatsapp" type="tel" required minlength="5" maxlength="40" autocomplete="tel"></label><label>País<input name="pais" required minlength="2" maxlength="80" value="Panamá" autocomplete="country-name"></label><label>Capital inicial (USD)<input name="capital" type="number" min="500" max="100000000" step="0.01" value="500" required></label><button class="btn primary">Enviar solicitud</button><p role="status"></p></form></div>`;
 document.body.append(overlay);const close=()=>{overlay.remove();document.removeEventListener('keydown',esc);};const esc=e=>{if(e.key==='Escape')close();};document.addEventListener('keydown',esc);
 overlay.querySelector('.modalClose').onclick=close;overlay.onclick=e=>{if(e.target===overlay)close();};overlay.querySelector('input').focus();
 overlay.querySelector('form').onsubmit=async e=>{e.preventDefault();const f=e.target,button=f.querySelector('button'),msg=f.querySelector('[role=status]');button.disabled=true;
 try{const d=new FormData(f);const {error}=await rcApplicationDb.rpc('rc_apply',{p_nombre:d.get('nombre'),p_email:d.get('email'),p_whatsapp:d.get('whatsapp'),p_pais:d.get('pais'),p_capital:Number(d.get('capital'))});if(error)throw error;
 f.replaceChildren();const p=document.createElement('p');p.textContent='Solicitud recibida. Si es aprobada, recibirás un correo para crear tu contraseña y acceder al portal.';f.append(p);
 }catch(err){msg.textContent='No pudimos guardar la solicitud. Intenta de nuevo.';button.disabled=false;}};
}
