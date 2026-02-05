import '../dotenv';
import { Team } from 'models';
import mongoose from '../mongoose.js';
import normalizeTeamNames from '../utils/normalizeTeamNames.js';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import populateTeamData from '../populateTeamData.js';

const VARIANTS = {
	original: { width: null, height: null },
	large: { width: 96, height: 96 },
	small: { width: 48, height: 48 },
};

const createVariantFolders = () => {
	const tempPath = './src/images/temp';
	const webpPath = path.join(tempPath, 'webp');
	// Ensure temp directory exists
	if (!fs.existsSync('./src/images/temp')) {
		fs.mkdirSync('./src/images/temp', { recursive: true });
	}
	// Create webp directory and variant subdirectories
	if (!fs.existsSync(webpPath)) {
		fs.mkdirSync(webpPath);
		Object.keys(VARIANTS).forEach((variant) => {
			fs.mkdirSync(path.join(webpPath, variant));
		});
	}
};

const convertToWebp = async (inputPath, filename) => {
	const webpPath = './src/images/temp/webp';
	const image = sharp(inputPath);

	// Create each variant
	for (const [variant, size] of Object.entries(VARIANTS)) {
		const outputPath = path.join(webpPath, variant, filename.replace(/\.[^.]+$/, '.webp'));

		if (size.width && size.height) {
			await image.resize(size.width, size.height).webp().toFile(outputPath);
		} else {
			// Original size, just convert to webp
			await image.webp().toFile(outputPath);
		}
	}
};

const downloadImage = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok)
			throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);

		const buffer = await response.arrayBuffer();
		const filename = url.split('/').pop();
		const filepath = `./src/images/temp/${filename}`;

		fs.writeFileSync(filepath, Buffer.from(buffer));
		await convertToWebp(filepath, filename);
		return filename;
	} catch (error) {
		console.error(`Error downloading ${url}:`, error);
		return null;
	}
};

const downloadAllImages = async (urls) => {
	return Promise.all(
		urls.map(async (url) => {
			const filename = await downloadImage(url);
			console.log(filename);
		})
	);
};

const createImages = async () => {
	createVariantFolders();
	await mongoose();

	const teams = await Team.find({}).select('name');

	const onlyNames = teams.map((x) => normalizeTeamNames(x.name));
	const { teamData } = await populateTeamData(onlyNames);
	console.log(teamData);
	const espnLogos = teamData.map((x) => x.espnLogo).filter((x) => x);
	console.log('downloading ' + espnLogos.length + ' images');
	console.log(espnLogos.length);
	await downloadAllImages(espnLogos);
	console.log('done');
};

createImages();
