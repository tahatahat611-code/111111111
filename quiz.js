(function(){
  const $=s=>document.querySelector(s);
  window.initExam=function(){
    const mount=$('#examMount'); if(!mount)return;
    const bank=[...window.ACADEMY_DATA.exam].sort(()=>Math.random()-.5).slice(0,20);
    let idx=0,score=0,answered=false;
    const render=()=>{ const q=bank[idx]; answered=false; mount.innerHTML=`<div class="quiz-card"><div class="quiz-meta"><span>الاختبار النهائي — ${idx+1}/20</span><span>النتيجة: ${score}/${idx}</span></div><div class="quiz-question">${q.q}</div><div class="option-grid">${q.opts.map((o,i)=>`<button class="option" data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div><div id="qFeedback"></div></div>`; mount.querySelectorAll('.option').forEach(btn=>btn.addEventListener('click',()=>{if(answered)return;answered=true;const n=+btn.dataset.i;const ok=n===q.a;if(ok)score++;btn.classList.add(ok?'selected':'wrong');if(!ok)mount.querySelectorAll('.option')[q.a].classList.add('selected');$('#qFeedback').innerHTML=`<div class="feedback ${ok?'good':'danger'}"><strong>${ok?'صحيح':'INصحيح'}</strong><br>${q.e}<div style="margin-top:10px"><button class="btn btn-primary btn-small" id="nextQ">${idx===bank.length-1?'عرض النتيجة':'السؤال التالي'} →</button></div></div>`;$('#nextQ').addEventListener('click',()=>{if(idx<bank.length-1){idx++;render()}else finish()});})); };
    const finish=()=>{const pct=Math.round(score/bank.length*100);const xp=(Number(localStorage.getItem('cda_xp'))||0)+pct*2;localStorage.setItem('cda_xp',xp);localStorage.setItem('cda_exam_score',pct);mount.innerHTML=`<div class="panel" style="text-align:center"><div class="score-ring" style="--score:${pct}%;margin:0 auto"><span>${pct}%</span></div><h2>اكتمل الاختبار النهائي</h2><p class="muted">${score} / ${bank.length} إجابة صحيحة. سيتم استخدام هذه النتيجة في تقريرك.</p><a class="btn btn-primary" href="report.html">فتح تقرير الأمان →</a></div>`;};
    render();
  };
})();
