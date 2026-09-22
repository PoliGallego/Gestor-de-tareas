export type ProfileProps = {
    imgUrl: string | null;
    userName: string;
}

export function ProfilePic({ imgUrl, userName }: ProfileProps) {

    const random = (): string => {
        return Math.floor(Math.random() * (200) + 10).toString();
    };

    const getColor = (): string => {
        return random() + "," + random() + "," + random();
    };

    const getInitials = (name: string): string => {
        let letters: string[];

        letters = name.split(" ");

        if (letters.length > 1) {
            return letters[0].charAt(0).toUpperCase() +
                letters[letters.length - 1].charAt(0).toUpperCase();
        } else {
            return letters[0].substring(0, 2).toUpperCase();
        }
    };

    return imgUrl ? <img draggable={false} className='header-img'
        src={imgUrl} alt="profile picture" /> :
        <div className="alt-img" style={{ background: 'rgb(' + getColor() + ')' }}>
            <h2>{getInitials(userName)}</h2>
        </div>
}