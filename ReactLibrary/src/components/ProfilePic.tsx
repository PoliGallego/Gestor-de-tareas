export type ProfileProps = {
    imgUrl: string | null;
    userName: string;
}

export function ProfilePic({ imgUrl, userName }: ProfileProps) {

    const validNum = (num: number): number => {
        if (isNaN(num)) {
            return 0;
        }

        if (num > 255) {
            return 255;
        }

        return num;
    }

    const getColor = (name: string): string => {
        let r: number = name.charCodeAt(0);
        let g: number = name.charCodeAt(1);
        let b: number = name.charCodeAt(2);
        
        r = validNum(r);
        g = validNum(g);
        b = validNum(b);

        return r.toString + "," + g.toString + "," + b.toString;
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
        <div className="alt-img" style={{ background: 'rgb(' + getColor(userName) + ')' }}>
            <h2>{getInitials(userName)}</h2>
        </div>
}