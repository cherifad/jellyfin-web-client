import { language } from "./constants";

function extractYoutubeVideoId(url: String) {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}

function ticksToHoursAndMinutes(ticks: number) {
  const minutes = Math.floor(ticks / 600000000);
  const hours = Math.floor(minutes / 60);
  return {
    hours,
    minutes: minutes - hours * 60,
  };
}

function endAt(durationInTicks: number) {
  const now = new Date();
  const duration = ticksToHoursAndMinutes(durationInTicks);

  const endAt = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours() + duration.hours,
    now.getMinutes() + duration.minutes
  );

  // only return the time, not the date. In case the time is tomorrow, we don't want to show the date
  const endAtTime = endAt.toLocaleTimeString([], { timeStyle: "short" });

  return endAtTime;
}

function getAudioSubtitleLanguages(mediaStreams: object[]) {
  const audioStreams = mediaStreams.filter(
    (stream: any) => stream.Type === "Audio"
  );
  var audioLanguages = audioStreams.map((stream: any) => stream.Language);

  const subtitleStreams = mediaStreams.filter(
    (stream: any) => stream.Type === "Subtitle"
  );
  var subtitleLanguages = subtitleStreams.map((stream: any) => stream.Language);

  // remove duplicates
  (audioLanguages = [...new Set(audioLanguages)]),
    (subtitleLanguages = [...new Set(subtitleLanguages)]);

  // associate language code with language name
  for (let i = 0; i < audioLanguages.length; i++) {
    audioLanguages[i] = {
      code: audioLanguages[i],
      img: "../../assets/img/flags/" + language[audioLanguages[i]] + ".png",
      name: language[audioLanguages[i]],
    };
  }
  for (let i = 0; i < subtitleLanguages.length; i++) {
    subtitleLanguages[i] = {
      code: subtitleLanguages[i],
      img: "../../assets/img/flags/" + language[subtitleLanguages[i]] + ".png",
      name: language[subtitleLanguages[i]],
    };
  }

  return {
    audioLanguages: audioLanguages,
    subtitleLanguages: subtitleLanguages,
  };
}

function toLocaleDateString(date: Date) {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function getLocalImage(image: string) {
  const module = await import(/* @vite-ignore */image);
  return module.default;
}

export {
  extractYoutubeVideoId,
  ticksToHoursAndMinutes,
  endAt,
  getAudioSubtitleLanguages,
  toLocaleDateString,
  getLocalImage,
};
