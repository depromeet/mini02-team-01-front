export function getAppkey(){
    return import(`/config.json`)
    .then(r=>r);
}