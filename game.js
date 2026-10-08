(function(){
  const $=s=>document.querySelector(s);
  const data=window.ACADEMY_DATA;
  window.initGame=function(){
    const mount=$('#gameMount'); if(!mount)return;
    let idx=0,score=0,choices=[];
    const render=()=>{
      const m=data.gameMissions[idx];
      mount.innerHTML=`<div class="quiz-card"><div class="quiz-meta"><span>المهمة ${m.id} / 10</span><span>النتيجة: ${score}</span></div><div class="quiz-question">${m.icon} ${m.title}<br><span class="muted">${m.prompt}</span></div><div class="option-grid">${m.choices.map((c,i)=>`<button class="option" data-i="${i}">${c}</button>`).join('')}</div><div id="missionFeedback"></div></div>`;
      mount.querySelectorAll('.option').forEach(btn=>btn.addEventListener('click',()=>{
        const n=Number(btn.dataset.i); const ok=n===m.correct; btn.classList.add(ok?'selected':'wrong'); if(ok)score+=100;
        choices.push({mission:m.id,ok});
        $('#missionFeedback').innerHTML=`<div class="feedback ${ok?'good':'danger'}"><strong>${ok?'صحيح +100 XP':'ليس تمامًا'}</strong><br>${m.explain}<div style="margin-top:10px"><button class="btn btn-primary btn-small" id="nextMission">${idx===data.gameMissions.length-1?'إنهاء':'المهمة التالية'} →</button></div></div>`;
        mount.querySelectorAll('.option').forEach(x=>x.disabled=true);
        $('#nextMission').addEventListener('click',()=>{if(idx<data.gameMissions.length-1){idx++;render()}else finish()});
      }));
    };
    const finish=()=>{ const perfect=choices.filter(x=>x.ok).length===10; if(perfect)score+=500; const xp=(Number(localStorage.getItem('cda_xp'))||0)+score; localStorage.setItem('cda_xp',xp); localStorage.setItem('cda_game_score',score); localStorage.setItem('cda_game_done','10'); mount.innerHTML=`<div class="panel" style="text-align:center"><div class="score-ring" style="--score:${Math.min(100,score/10)}%;margin:0 auto"><span>${Math.round(score/10)}%</span></div><h2 style="margin-top:16px">🏆 المهمة COMPLETE</h2><p class="muted">تم كسب ${score} XP${perfect?' + 500 XP مكافأة الإتقان':''}. تم حفظ نتائجك في هذا المتصفح.</p><a class="btn btn-primary" href="report.html">فتح تقرير الأمان →</a></div>`;};
    render();
  };
})();
