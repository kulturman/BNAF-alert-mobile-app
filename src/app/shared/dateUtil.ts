import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateUtil {
  formatSecondsToMinutes(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const paddedMinutes: string = String(minutes).padStart(2, '0');
    const paddedSeconds: string = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  }

}
