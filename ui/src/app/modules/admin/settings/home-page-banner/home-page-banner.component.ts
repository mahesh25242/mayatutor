import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { GeneralService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { Banner } from 'src/app/lib/interfaces';

@Component({
  selector: 'app-home-page-banner',
  templateUrl: './home-page-banner.component.html',
  styleUrls: ['./home-page-banner.component.scss']
})
export class HomePageBannerComponent implements OnInit, OnDestroy {
  bannerFrm: FormGroup;
  banners$: Observable<Banner[]>;
  uploadBannerSubScr: Subscription;
  delBannerSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private generalService: GeneralService) { }

    deleteBanner(item: FormGroup){
      Notiflix.Loading.Dots();
      Notiflix.Confirm.Show('Delete', `Do you want to delete ?`, 'Yes', 'No', () => {

        const postData ={
          "id" : item.controls.id.value
        }
        this.delBannerSubScr = this.generalService.deleteBanner(postData).pipe(mergeMap(res=>this.banners())).subscribe(res=>{
          Notiflix.Notify.Success(`Successfully saved `);
          Notiflix.Loading.Remove();
        }, error=>{
          Notiflix.Loading.Remove();
        });
      }, () => {
        Notiflix.Loading.Remove();
      } );

    }
  save(item: FormGroup){
    Notiflix.Loading.Standard();
    const formData = new FormData();
    formData.append('file_path', (item.controls.file_path.value) ? item.controls.file_path.value : '');
    formData.append('sort_order', item.controls.sort_order.value);
    formData.append('type', item.controls.type.value);
    formData.append('description', item.controls.description.value);
    formData.append('name', item.controls.name.value);
    formData.append('id', item.controls.id.value);
    this.uploadBannerSubScr = this.generalService.saveBanner(formData).pipe(mergeMap(res=>this.banners())).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved `);
      Notiflix.Loading.Remove();
    }, error=>{
      Notiflix.Loading.Remove();
    });
  }

  handleFileInput(item: any, files: FileList) {
    item.controls.file_path.setValue(files.item(0))
  }


  get banner() {
    return this.bannerFrm.get('banner') as FormArray;
 }

 addNew(){
  this.banner.push(
    this.formBuilder.group({
      id: 0,
      name: '',
      description: '',
      file_path: null,
      file_src: null,
      type: 'banner',
      sort_order: (this.banner.length + 1)
    })
  );
 }
  banners(){
    return this.generalService.getAllBanner().pipe(tap(res=>{
      const mailArray = <FormArray>this.bannerFrm.controls.banner;
      mailArray.controls = [];

      res.map(banner=>{

        mailArray.push(this.formBuilder.group({
          id: banner.id,
          name: banner.name,
          description: banner.description,
          file_path: null,
          file_src: banner.file_path,
          type: banner.file_path,
          sort_order: banner.sort_order
        }));

      })
    }));
  }
  ngOnInit(): void {
    this.bannerFrm = this.formBuilder.group({
      banner: this.formBuilder.array([]),
    });

    this.banners$ = this.banners();
  }

  ngOnDestroy(){
    this.uploadBannerSubScr && this.uploadBannerSubScr.unsubscribe();
    this.delBannerSubScr && this.delBannerSubScr.unsubscribe();
  }

}
