export const isColliding = (player, boulder) => {
    let radiusPlayer = 18 / 2;
    let radiusBoulder = 40 / 2;
    let centerDistance = Math.sqrt(
        Math.pow(player.x - boulder.x, 2) +
        Math.pow(player.y - boulder.y, 2)
    );
    return centerDistance <= radiusBoulder + radiusPlayer;
}

export const hit = (entity, vx, vy, speed) =>
{
    entity.vx = vx;
    entity.vy = vy;
    entity.speed = speed;
}

export const onCollide = (player, entity) => {
    const playerSpeed = Math.sqrt(player.vx*player.vx + player.vy*player.vy);
    if(entity.vx == 0 && entity.vy == 0)
    {
        if(playerSpeed >= 2){
            hit(entity, player.vx, player.vy, playerSpeed * 2);
        }
    }
}
