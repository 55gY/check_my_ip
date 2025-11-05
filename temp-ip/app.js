const $$ = document;
const random = Math.floor(Math.random() * 100000000);

const IP = {
    // fetch wrapper with timeout and optional text/json handling
    get:(url,type='json',timeout=5000)=>{const controller=new AbortController();const signal=controller.signal;const timeoutId=setTimeout(()=>controller.abort(),timeout);return fetch(url,{method:'GET',signal}).then((resp)=>{clearTimeout(timeoutId);if(type==='text')return Promise.all([resp.ok,resp.status,resp.text(),resp.headers]);return Promise.all([resp.ok,resp.status,resp.json(),resp.headers])}).then(([ok,status,data,headers])=>{if(ok)return{ok,status,data,headers};throw new Error('Network error')}).catch((error)=>{if(error.name==='AbortError')throw new Error('Request timed out');throw error})},

    
    getupaiyunIP: () =>
        IP.get(`https://pubstatic.b0.upaiyun.com/?_upnode&r=${random}`, 'json')
            .then((resp) => {
                if (resp && resp.data) {
                    $$.getElementById('ip-upai').innerHTML = resp.data.remote_addr || 'N/A';
                    const loc = resp.data.remote_addr_location || {};
                    $$.getElementById('ip-upai-geo').innerHTML = `${loc.country || ''} ${loc.province || ''} ${loc.isp || ''}`.trim();
                }
            })
            .catch(() => {
                console.log('Failed to load resource: pubstatic.b0.upaiyun.com');
                $$.getElementById('ip-upai').innerHTML = 'N/A';
            }),

    
    getipuuIP: () => {
        IP.get(`https://www.ipuu.net/ipuu/user/getIP?r=${random}`, 'json')
            .then((resp) => {
                $$.getElementById('ip-ipuu').innerHTML = (resp.data && resp.data.data) || 'N/A';
            })
            .catch(() => {
                console.log('Failed to load resource: www.ipuu.net getIP');
                $$.getElementById('ip-ipuu').innerHTML = 'N/A';
            });

        IP.get(`https://www.ipuu.net/ipuu/user/getLocation?r=${random}`, 'json')
            .then((resp) => {
                $$.getElementById('ip-ipuu-geo').innerHTML = (resp.data && resp.data.data) || '';
            })
            .catch(() => {
                console.log('Failed to load resource: www.ipuu.net getLocation');
            });
    },

    getIpsbIP: () =>
        IP.get(`https://api-ipv4.ip.sb/geoip?z=${random}`, 'json')
            .then((resp) => {
                $$.getElementById('ip-ipsb').innerHTML = resp.data.ip || 'N/A';
                $$.getElementById('ip-ipsb-geo').innerHTML = `${resp.data.country || ''} ${resp.data.city || ''} ${resp.data.organization || ''}`.trim();
            })
            .catch(() => {
                console.log('Failed to load resource: api.ip.sb');
                $$.getElementById('ip-ipsb').innerHTML = 'N/A';
            }),

    getIpapiIP: () =>
        IP.get(`https://ipapi.co/json?z=${random}`, 'json')
            .then((resp) => {
                $$.getElementById('ip-ipapi').innerHTML = (resp.data && resp.data.ip) || 'N/A';
                $$.getElementById('ip-ipapi-geo').innerHTML = `${(resp.data && resp.data.country_name) || ''} ${(resp.data && resp.data.city) || ''} ${(resp.data && resp.data.org) || ''}`.trim();
            })
            .catch(() => {
                console.log('Failed to load resource: ipapi.co');
                $$.getElementById('ip-ipapi').innerHTML = 'N/A';
            }),

    
};


const Region = {
    get:(url,type)=>fetch(url,{method:'GET'}).then((resp)=>(type==='text'?Promise.all([resp.ok,resp.status,resp.text(),resp.headers]):Promise.all([resp.ok,resp.status,resp.json(),resp.headers]))).then(([ok,status,data,headers])=>{if(ok)return{ok,status,data,headers};throw new Error('Network error')}),


    getlolicpIP: () =>
        Region.get(`https://ip.lolicp.com/`, 'text')
            .then((resp) => {
                $$.getElementById('ip-lolicp').innerHTML = resp.data || 'N/A';
            })
            .catch(() => {
                console.log('Failed to load resource: ip.lolicp.com');
                $$.getElementById('ip-lolicp').innerHTML = 'N/A';
            }),

    getiqiyiIP: () =>
        Region.get(`https://data.video.iqiyi.com/v.f4v?z=${random}`, 'json')
            .then((resp) => {
                const data = resp.data && resp.data.t ? resp.data.t : '';
                const parts = data.split('-');
                const regionInfo = parts[0] ? parts[0].replace('|', ' ') : '';
                $$.getElementById('ip-iqiyi').innerHTML = parts[1] || 'N/A';
                $$.getElementById('ip-iqiyi-geo').innerHTML = regionInfo;
            })
            .catch(() => {
                console.log('Failed to load resource: data.video.iqiyi.com');
                $$.getElementById('ip-iqiyi').innerHTML = 'N/A';
            })
};


