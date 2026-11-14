type ImageSize = 'original' | 'large' | 'small';

const getLogoUrl = ({ logoFile, size = 'large' }: { logoFile: string; size?: ImageSize }) => {
	return `/webp/${size}/${logoFile}.webp`;
};
export default getLogoUrl;
