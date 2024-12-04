import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, RefresherCustomEvent } from '@ionic/angular';

interface Card {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image?: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  folder: string = 'Cards';
  searchText: string = '';
  selectedSegment: string = 'all';
  cards: Card[] = [];
  filteredCards: Card[] = [];
  showModal: boolean = false;
  isEditing: boolean = false;
  editingCard: Card | null = null;
  
  newCard: Card = {
    id: '',
    title: '',
    subtitle: '',
    content: '',
    image: '',
    isFavorite: false
  };

  constructor(
    private actionSheetController: ActionSheetController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Initialize with some dummy data
    this.cards = [
      {
        id: '1',
        title: 'Sample Card 1',
        subtitle: 'Subtitle 1',
        content: 'This is sample content for card 1',
        isFavorite: false
      },
      {
        id: '2',
        title: 'Sample Card 2',
        subtitle: 'Subtitle 2',
        content: 'This is sample content for card 2',
        isFavorite: true
      }
    ];
    this.applyFilters();
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      this.applyFilters();
      event.target.complete();
    }, 1000);
  }

  handleSearch() {
    this.applyFilters();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.cards];

    // Apply search filter
    if (this.searchText) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(card =>
        card.title.toLowerCase().includes(searchLower) ||
        card.subtitle.toLowerCase().includes(searchLower) ||
        card.content.toLowerCase().includes(searchLower)
      );
    }

    // Apply segment filter
    if (this.selectedSegment === 'favorite') {
      filtered = filtered.filter(card => card.isFavorite);
    }

    this.filteredCards = filtered;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share',
          icon: 'share-outline',
          handler: () => {
            // Handle share action
          }
        },
        {
          text: 'Delete All',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.cards = [];
            this.applyFilters();
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  toggleFavorite(card: Card) {
    card.isFavorite = !card.isFavorite;
    this.applyFilters();
  }

  editCard(card: Card) {
    this.editingCard = { ...card };
  }

  async selectImage() {
    // Implementasi sederhana menggunakan input file
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const imageUrl = e.target.result;
          if (this.editingCard) {
            this.editingCard.image = imageUrl;
          } else {
            this.newCard.image = imageUrl;
          }
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  saveCard() {
    if (this.editingCard) {
      const index = this.cards.findIndex(c => c.id === this.editingCard!.id);
      if (index !== -1) {
        this.cards[index] = { ...this.editingCard };
      }
      this.editingCard = null;
      this.applyFilters();
    }
  }

  cancelEdit() {
    this.editingCard = null;
  }

  showAddCardModal() {
    this.isEditing = false;
    this.newCard = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      content: '',
      image: '',
      isFavorite: false
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newCard = {
      id: '',
      title: '',
      subtitle: '',
      content: '',
      image: '',
      isFavorite: false
    };
  }

  saveNewCard() {
    if (this.newCard.title && this.newCard.content) {
      this.cards.unshift({ ...this.newCard });
      this.applyFilters();
      this.closeModal();
    }
  }
}