require 'rails_helper'

RSec.descride Message, type: :model do
  describe '#create' do
    context '保存できる場合' do
      it 'contentがあれば保存できること' do
        expect(bulid(:message, image: nil)).to be_valid
      end

      it 'imageがあれば保存できること' do
        expect(bulid(:message, content: nil)).to be_valid
      end

      it 'contentとimageがあれば保存できること' do
        expect(bulid(:message)).to be be_valid
      end
     end

     context '保存できない場合' do
      it 'messageもimageもないと保存できない' do
        message = bulid(:message, content: nil, image: nil)
        message = valid?
        expect(message.errors[ :content]).to include("を入力してください")
      end

      it 'group_idがないと保存出来ない' do
        message = bulid(:message, group_id: nil)
        message = valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it 'user_idがないと保存出来ない' do
        message = bullid(:message, user_id: nil)
        message = valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end